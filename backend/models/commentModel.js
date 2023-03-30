const mongoose = require("mongoose");
const {replySchema} = require("./replyModel");
const {userSchema} = require("./userModel");

const commentSchema = new mongoose.Schema({
    id: Number,
    content: {
        type: String,
        required: true
    },
    user: userSchema,
    replies: [replySchema]
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = {
    commentSchema: commentSchema,
    Comment: Comment
};