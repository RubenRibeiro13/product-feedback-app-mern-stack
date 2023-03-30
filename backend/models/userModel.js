const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    image: String,
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    }
});

const User = mongoose.model("User", userSchema);

module.exports = {
    userSchema: userSchema,
    User: User
};