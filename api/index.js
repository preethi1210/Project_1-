const express = require('express');
const cors = require('cors');
const User = require("./models/User");
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });
const app = express();
const Post=require('./models/Post')
const secret = process.env.JWT_SECRET || 'asdfwxcbvnmugfhdsw567890876redfghjklnbvc4rrz'; // Use environment variable for secret
const fs=require('fs');
app.use(cors({ credentials: true, origin: 'http://localhost:3000' })); // Enable CORS
app.use(express.json());
app.use(cookieParser());

const salt = bcrypt.genSaltSync(10);

mongoose.connect('mongodb+srv://blog:kCOhlpa5R8fhvaNf@cluster0.querf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json("Username and password are required");
    }

    try {
        const userDoc = await User.create({
            username,
            password: bcrypt.hashSync(password, salt),
        });
        res.json(userDoc);
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error });
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json("Username and password are required");
    }

    try {
        // Find user by username
        const userDoc = await User.findOne({ username });
        if (!userDoc) {
            return res.status(400).json("User not found");
        }

        // Check if the password is correct
        const passOk = bcrypt.compareSync(password, userDoc.password);
        if (!passOk) {
            return res.status(400).json("Wrong credentials");
        }

        // Generate JWT token
        jwt.sign(
            { username, id: userDoc._id },
            secret,
            {},
            (err, token) => {
                if (err) throw err;

                // Send token as cookie
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

app.get('/profile', (req, res) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json("Unauthorized");
    }

    jwt.verify(token, secret, {}, (err, info) => {
        if (err) {
            console.error("JWT verification error:", err);
            return res.status(403).json("Invalid token");
        }

        res.json(info);
    });
});

app.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok');
});

app.post('/post', uploadMiddleware.single('file'),async (req, res) => {
    const { originalname ,path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath=path+'.'+ext;
    fs.renameSync(path,newPath);
    const {title,summary,content}=req.body;
    const postDoc= await Post.create({title,summary,content,cover:newPath,})
    res.json(postDoc);
});
app.get('post',async(req,res)=>{
    res.json(await Post.find());
})
app.listen(4000, () => {
    console.log("Server is running on port 4000");
});
