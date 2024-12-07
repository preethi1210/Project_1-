const express = require('express');
const cors = require('cors');
const User = require("./models/User");
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const fs = require('fs');
const app = express();
const Post = require('./models/Post');
const secret = process.env.JWT_SECRET || 'asdfwxcbvnmugfhdsw567890876redfghjklnbvc4rrz';
const uploadMiddleware = multer({ dest: 'uploads/' });
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(cookieParser());

// MongoDB connection
mongoose.connect('mongodb+srv://blog:kCOhlpa5R8fhvaNf@cluster0.querf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json("Unauthorized");
    }

    jwt.verify(token, secret, {}, (err, info) => {
        if (err) {
            return res.status(403).json("Invalid token");
        }
        req.user = info; // Save user info to request
        next();
    });
};

// Register route
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json("Username and password are required");
    }

    try {
        const userDoc = await User.create({
            username,
            password: bcrypt.hashSync(password, 10),
        });
        res.json(userDoc);
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error });
    }
});

// Login route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json("Username and password are required");
    }

    try {
        const userDoc = await User.findOne({ username });
        if (!userDoc) {
            return res.status(400).json("User not found");
        }

        const passOk = bcrypt.compareSync(password, userDoc.password);
        if (!passOk) {
            return res.status(400).json("Wrong credentials");
        }

        jwt.sign(
            { username, id: userDoc._id },
            secret,
            {},
            (err, token) => {
                if (err) throw err;

                res.cookie('token', token, {
                    httpOnly: true, // Prevent JavaScript access to the cookie
                    secure: false, // Set to true in production if using HTTPS
                }).json("ok");
            }
        );
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
});

// Profile route
app.get('/profile', verifyToken, (req, res) => {
    res.json(req.user); // Return the user info from the token
});

// Logout route
app.post('/logout', (req, res) => {
    res.cookie('token', '', { maxAge: 0 }).json('ok'); // Clear the token
});

// Post creation route with file upload
app.post('/post', uploadMiddleware.single('file'), verifyToken, async (req, res) => {
    const { originalname, path } = req.file;
    const ext = originalname.split('.').pop();
    const newPath = `${path}.${ext}`;
    fs.renameSync(path, newPath); // Rename the file to include its extension

    try {
        const { title, summary, content } = req.body;
        const postDoc = await Post.create({
            title,
            summary,
            content,
            cover: newPath,  // Store the relative path
            author: req.user.id, // Use the verified user info
        });

        res.json(postDoc);
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ message: "Error creating post", error });
    }
});

// Fetch all posts route
app.get('/post', async (req, res) => {
    try {
        const posts = await Post.find().populate('author', ['username']).sort({createdAt:-1}).limit(20);
        res.json(posts);
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ message: "Error fetching posts", error });
    }
});
app.get('/post/:id', async (req, res) => {
    try {
        const { id } = req.params;



        const postDoc = await Post.findById(id).populate('author', ['username']);
        if (!postDoc) {
            return res.status(404).json({ error: 'Post not found' });
        }

        res.json(postDoc);
    } catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Server listening
app.listen(4000, () => {
    console.log("Server is running on port 4000");
});
