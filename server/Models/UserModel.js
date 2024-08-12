const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    picture: {
        type: String,
        default: "https://www.shutterstock.com/image-vector/user-login-authenticate-icon-human-260nw-1365533969.jpg"
    }
}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema)
module.exports = User;