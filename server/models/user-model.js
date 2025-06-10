const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
});

userSchema.methods.generateToken = function () {
    try {
        return jwt.sign(
            {
                _id: this._id,
                email: this.email,
                isAdmin: this.isAdmin,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h",
            }
        );
    } catch (error) {
        console.error("JWT generation error:", error);
        return null;
    }
};

const User = mongoose.model("User", userSchema);
module.exports = User;
