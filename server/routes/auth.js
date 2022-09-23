const router = require("express").Router();
const User = require("../models/User.js");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

//Register
router.post("/register", async (req, res) => {
    const { username, password, sprite } = req.body;
    if(!username || !password || !sprite) {
        res.status(400).json("invalid/incomplete input");
        return
    } 
    
    const existingUser = await User.findOne({ username});
    if(existingUser) return res.status(401).json("user already exists");

    const newUser = new User({
        username,
        password: CryptoJS.AES.encrypt(password, process.env.PASSWORD_SECRET_KEY).toString(),
        avatar: sprite
    })

    try {
        const savedUser = await newUser.save();

        const { password, ...others} = savedUser._doc;

        const accessToken = jwt.sign({
            id: savedUser._doc._id,
        }, 
        process.env.JWT_SECRET_KEY, 
        {expiresIn: "3d"}
        );

        res.status(201).json({...others, accessToken});
    } catch(err) {
        res.status(500).json(err);
    }

});

//LOGIN
router.post("/login", async (req, res) => {
    const { username, password: formPassword } = req.body;
    try {
        const user = await User.findOne({ username});
        if(!user) return res.status(401).json("wrong username");

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASSWORD_SECRET_KEY);
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        if(originalPassword != formPassword) return res.status(401).json("wrong password");

        const accessToken = jwt.sign({
            id: user._id,
        }, 
        process.env.JWT_SECRET_KEY, 
        {expiresIn: "3d"}
        );

        const { password, ...others} = user._doc;

        res.status(201).json({...others, accessToken});
    } catch(err) {
        res.status(501).json(err)
    }
    
});

module.exports = router;