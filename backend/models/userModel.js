const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
/* const validator = require("validator");
const fs = require("fs"); */

const userSchema = new mongoose.Schema({
    image: String,
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

userSchema.statics.signup = async function(image, name, username, password) {
    /* if (
        !/^[A-Z][a-z]+ [A-Z][a-z]+$/.test(name) ||
        !/^[a-z]+([_.][a-z]+)*([0-9]*|[.][0-9]+)$/.test(username) ||
        !validator.isStrongPassword(password)
    ) {
        throw Error("Name, username and password fields must be properly filled");
    } */


    const userExists = await this.findOne({username: username});
    if (userExists) {
        throw Error("This username already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await this.create({
        image: image,
        name: name,
        username: username,
        password: hash
    });

    /* fs.readFile(image, (err, data) => {
        if (err) {
            throw err;
        }
        
        console.log(Buffer.from(data, "binary").toString("base64"));
    }); */

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