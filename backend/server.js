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
/* mongoose.connect('mongodb://127.0.0.1:27017/productfeedbackDB'); */
mongoose.connect(process.env.MONGO_URI);

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

app.listen(process.env.PORT || 4000);