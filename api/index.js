const express = require('express');
const cors = require('cors');
const User = require("./models/User");
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const secret = 'asdfwxcbvnmugfhdsw567890876redfghjklnbvc4rrz';

app.use(cors({ credentials: true, origin: 'http://localhost:3000' })); // Enable CORS
app.use(express.json());
app.use(cookieParser());

const salt = bcrypt.genSaltSync(10);

mongoose.connect('mongodb+srv://blog:k7G2Oz6PWkpgZ583@cluster0.82afm.mongodb.net/');

app.post('/register', async (req, res) => {
    const { username, password } = req.body;

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
app.post('/logout',(req,res)=>{
    res.cookie('token','').json('ok');
})

app.post('/post',(req,res)=>{})
app.listen(4000, () => {
    console.log("Server is running on port 4000");
});
