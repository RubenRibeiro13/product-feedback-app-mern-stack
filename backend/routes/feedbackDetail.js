const router = require("express").Router();
const ProductRequest = require("../models/productRequestModel");
const Comment = require("../models/commentModel");
const Reply = require("../models/replyModel");
const data = require("../data");

router.get("/", async (req, res) => {
    const productRequests = await ProductRequest.find({});
    res.json(productRequests);
});

router.post("/:suggestionId", async (req, res) => {
    const user = JSON.parse(data).currentUser;

    if (req.body.buttonName === "comment") {
        const {content} = req.body;
        const id = await Comment.find({}).length + 1;
        const replies = [];

        try {
            const latestComment = await Comment.create({id, content, user, replies});

            const correspondingProductRequest = await ProductRequest.findById(req.params.suggestionId);
            correspondingProductRequest.comments.push(latestComment);
            await correspondingProductRequest.save();
        } catch(error) {

        }
    } else {
        const {content, replyingTo, replyingToId} = req.body;

        try {
            const latestReply = await Reply.create({content, replyingTo, user});

            Comment.find({}, (err, comments) => {
                comments.forEach(comment => {
                    if (comment._id === replyingToId) {
                        comment.replies.push(latestReply);
                    }
                });
            });

            Comment.find({}, (err, comments) => {
                comments.forEach(comment => {
                    comment.replies.forEach(reply => {
                        if (reply._id === replyingToId) {
                            comment.replies.push(latestReply);
                        }
                    });
                });
            });
        } catch(error) {

        }
    }
});

router.get("/edit-feedback/:suggestionId", async (req, res) => {
    await ProductRequest.findById(req.params.suggestionId);
});

router.patch("/edit-feedback/:suggestionId", async (req, res) => {
    const {title, category, status, description} = req.body;

    try {
        const updatedProductRequest = await ProductRequest.findById(req.params.suggestionId);
        updatedProductRequest = {...updatedProductRequest, title, category, status, description};
        await updatedProductRequest.save();

        res.redirect("/feedback-detail/" + req.params.suggestionId);
    } catch(error) {

    }
});

router.delete("/edit-feedback/:suggestionId", (req, res) => {
    ProductRequest.findByIdAndDelete(req.params.suggestionId);
});

module.exports = router;