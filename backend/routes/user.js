const {User} = require("../models/userModel");
const router = require("express").Router();
const jwt = require("jsonwebtoken");

const createToken = id => {
    return jwt.sign({id}, process.env.SECRET, {expiresIn: "1h"});
}

router.post("/login", async (req, res) => {
    const {username, password} = req.body;

    try {
        const user = await User.login(username, password);
        const token = createToken(user._id);
        
        res.json({username, token});
    } catch (error) {
        res.json({error: error.message});
    }
});

router.post("/signup", async (req, res) => {
    const {username} = req.body;

    try {
        const user = await User.signup(req.body);
        const token = createToken(user._id);
        
        res.json({username, token});
    } catch (error) {
        res.json({error: error.message});
    }
});

module.exports = router;