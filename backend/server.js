const mongoose = require("mongoose");
const Database = require("./models/databaseModel");
const ProductRequest = require("./models/productRequestModel");
const {Comment} = require("./models/commentModel");
const {Reply} = require("./models/replyModel");
const {User} = require("./models/userModel");
const data = require("./data");

const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const homeRoutes = require("./routes/home");
const feedbackDetailRoutes = require("./routes/feedbackDetail");
const editFeedbackRoutes = require("./routes/editFeedback");
const userRoutes = require("./routes/user");

mongoose.set("strictQuery", false);
mongoose.connect('mongodb://127.0.0.1:27017/productfeedbackDB');

app.use(express.json({limit: "10mb"}));
app.use(cors());
app.use("/", homeRoutes);
app.use("/feedback-detail", feedbackDetailRoutes);
app.use("/edit-feedback", editFeedbackRoutes);
app.use("/user", userRoutes);

const checkDatabase = async () => {
    const testDatabase = await Database.find({});
    if (testDatabase.length === 0) {
        await Database.create({isUsed: false});
    }

    const databaseArray = await Database.find({});
    const database = databaseArray[0];
    if (!database.isUsed) {
        await ProductRequest.create(data.productRequests);

        const initialProductRequests = ProductRequest.find({});
        let initialComments = [];
        let initialReplies = [];
        let initialUsers = [];
        let initialUsernames = [];

        (await initialProductRequests).forEach(productRequest => {
            productRequest.comments.forEach(comment => {
                initialComments.push(comment);

                if (!initialUsernames.includes(comment.user.username)) {
                    initialUsernames.push(comment.user.username);
                    initialUsers.push(comment.user);
                }

                comment.replies.forEach(reply => {
                    initialReplies.push(reply);

                    if (!initialUsernames.includes(reply.user.username)) {
                        initialUsernames.push(reply.user.username);
                        initialUsers.push(reply.user);
                    }
                });
            });
        });
        
        Comment.insertMany(initialComments);
        Reply.insertMany(initialReplies);
        User.insertMany(initialUsers);

        const updatedDatabase = await Database.findOne({isUsed: false});
        updatedDatabase.isUsed = true;
        await updatedDatabase.save();
    }
}

checkDatabase();

/* app.get("/", async (req, res) => {
    const testDatabase = await Database.find({});
    if (testDatabase.length === 0) {
        await Database.create({isUsed: false});
    }

    const databaseArray = await Database.find({});
    const database = databaseArray[0];

    if (!database.isUsed) {
        await ProductRequest.create(data.productRequests);

        const initialProductRequests = ProductRequest.find({});
        let initialComments = [];
        let initialReplies = [];
        let initialUsers = [];
        let initialUsernames = [];

        (await initialProductRequests).forEach(productRequest => {
            productRequest.comments.forEach(comment => {
                initialComments.push(comment);

                if (!initialUsernames.includes(comment.user.username)) {
                    initialUsernames.push(comment.user.username);
                    initialUsers.push(comment.user);
                }

                comment.replies.forEach(reply => {
                    initialReplies.push(reply);

                    if (!initialUsernames.includes(reply.user.username)) {
                        initialUsernames.push(reply.user.username);
                        initialUsers.push(reply.user);
                    }
                });
            });
        });
        
        Comment.insertMany(initialComments);
        Reply.insertMany(initialReplies);
        User.insertMany(initialUsers);
        
        const updatedDatabase = await Database.findOne({isUsed: false});
        updatedDatabase.isUsed = true;
        await updatedDatabase.save();



        let initialProductRequests = data.productRequests;
        let initialComments = [];

        initialProductRequests.forEach(productRequest => {
            if (productRequest.comments === undefined) {
                productRequest.comments = [];
            }

            initialComments.push(productRequest.comments);
        });

        let initialProductRequests = data.productRequests;
        let initialComments = [];
        let initialReplies = [];
        let initialUsers = [];
        let initialUsernames = [];

        initialProductRequests.forEach(productRequest => {
            if (productRequest.comments === undefined) {
                productRequest.comments = [];
            }

            productRequest.comments.forEach(comment => {
                if (!initialUsernames.includes(comment.user.username)) {
                    initialUsernames.push(comment.user.username);
                    initialUsers.push(comment.user);
                }

                if (comment.replies === undefined) {
                    comment.replies = [];
                }
                initialComments.push(comment);

                comment.replies.forEach(reply => {
                    if (!initialUsernames.includes(reply.user.username)) {
                        initialUsernames.push(reply.user.username);
                        initialUsers.push(reply.user);
                    }

                    initialReplies.push(reply);
                });
            });
        });

        await User.create(initialUsers);
        const initialUsersIdentified = await User.find({});
        await Reply.create(initialReplies);
        const initialRepliesIdentified = await Reply.find({});
        await Comment.create(initialComments);
        const initialCommentsIdentified = await Comment.find({});
        await ProductRequest.create(initialProductRequests);
        const initialProductRequestsIdentified = await ProductRequest.find({});

        console.log(initialProductRequestsIdentified);

        initialRepliesIdentified.forEach(reply => {
            reply.user = initialUsersIdentified.find(identifiedUser => {
                return identifiedUser.username === reply.user.username;
            });
        });
        await initialRepliesIdentified.save();

        let repliesCounter = 0;
        initialCommentsIdentified.forEach(comment => {
            comment.replies.forEach(reply => {
                reply = initialRepliesIdentified[repliesCounter];
                repliesCounter++;
            });
        });
        await initialCommentsIdentified.save();

        let commentsCounter = 0;
        initialProductRequestsIdentified.forEach(productRequest => {
            productRequest.comments.forEach(comment => {
                comment = initialCommentsIdentified[commentsCounter];
                commentsCounter++;
            });
        });
        await initialProductRequestsIdentified.save();

        Database.findOneAndUpdate({isUsed: false}, {isUsed: true});

        await ProductRequest.create(JSON.parse(data).productRequests);

        ProductRequest.find({}, (err, productRequests) => {
            productRequests.forEach(productRequest => {
                if (productRequest.comments === undefined) {
                    productRequest.comments = [];
                }
    
                productRequest.comments.forEach(comment => {
                    if (!initialUsers.includes(comment.user)) {
                        initialUsers.push(comment.user);
                    }
    
                    if (comment.replies === undefined) {
                        comment.replies = [];
                    }
                    initialComments.push(comment);
    
                    comment.replies.forEach(reply => {
                        if (!initialUsers.includes(reply.user)) {
                            initialUsers.push(reply.user);
                        }
    
                        initialReplies.push(reply);
                    });
                });
            });
        });
    }

    const productRequests = await ProductRequest.find({});
    res.json(productRequests);
}); */

app.listen(process.env.PORT || 4000);