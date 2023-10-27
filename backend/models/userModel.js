const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const fs = require("fs");

const userSchema = new mongoose.Schema({
    image: String,
    imageColor: String,
    imageWidth: Number,
    imageLeft: Number,
    imageTop: Number,
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.statics.signup = async function(submittedUser) {
    const userExists = await this.findOne({username: submittedUser.username});
    if (userExists) {
        throw Error("This username already exists");
    }

    const imagePath = "../frontend/public/images/users/" + submittedUser.username + ".png";
    const imageBase64 = submittedUser.imageFile.replace(/^data:image\/\w+;base64,/, "");
    fs.writeFile(imagePath, Buffer.from(imageBase64, "base64"), err => {});

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(submittedUser.password, salt);
    const user = await this.create({
        image: "images/users/" + submittedUser.username + ".png",
        imageColor: submittedUser.imageColor,
        imageWidth: submittedUser.imageWidth,
        imageLeft: submittedUser.imageLeft,
        imageTop: submittedUser.imageTop,
        name: submittedUser.name,
        username: submittedUser.username,
        password: hash
    });

    return user;
}

userSchema.statics.login = async function(username, password) {
    if (!username || !password) {
        throw Error("All fields must be filled");
    }

    const user = await this.findOne({username});
    if (!user) {
        throw Error("Incorrect username or password");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        throw Error("Incorrect username or password");
    }

    return user;
}

const User = mongoose.model("User", userSchema);

module.exports = {
    userSchema: userSchema,
    User: User
};