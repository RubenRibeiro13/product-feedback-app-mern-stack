const mongoose = require("mongoose");
const {userSchema} = require("./userModel");

const replySchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    replyingTo: String,
    user: userSchema
});

const Reply = mongoose.model("Reply", replySchema);

module.exports = {
    replySchema: replySchema,
    Reply: Reply
};