const mongoose = require("mongoose");

const databaseSchema = new mongoose.Schema({
    isUsed: Boolean
});

module.exports = mongoose.model("Database", databaseSchema);