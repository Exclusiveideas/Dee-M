const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true},
        password: { type: String, required: true},
        avatar: { type: String, required: true},
        friends: { type: String },
        friend: { type: String },
        friendRequest: { type: Array, default: []},
    }, 
    { timestamps: true},
);

module.exports = mongoose.model("User", UserSchema);