const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullName: { type: String },
    email: { type: String },
    password: { type: String },
    createdOn: { type: Date, default: Date.now }, // ✅ fixed
});

module.exports = mongoose.model("User", userSchema);
