const mongoose = require("mongoose");
const {commentSchema} = require("./commentModel");

const productRequestSchema = new mongoose.Schema({
    id: Number,
    title: {
        type: String,
        required: true
    },
    category: String,
    upvotes: Number,
    status: String,
    description: {
        type: String,
        required: true
    },
    comments: [commentSchema]
});

module.exports = mongoose.model("ProductRequest", productRequestSchema);