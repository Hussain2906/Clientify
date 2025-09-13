const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true, // extra spaces hata dega
    },
    email: {
        type: String,
        required: true,
        unique: true, // ek email se ek hi user banega
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        default: null, // admin create karte waqt password empty hoga
    },
    role: {
        type: String,
        enum: ["admin", "salesTL", "salesperson", "support", "analyst"],
        default: "salesperson",
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
    },
    verificationTokenExpires: {
        type: Date,
    },
},
    { timestamps: true }
)

// password hashing here 

userSchema.pre('save', async function (next) {
    if (!this.isModified('password') || !this.password) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// method for comparing password

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

// Verification token generation method
userSchema.methods.generateVerificationToken = function () {
    const token = crypto.randomBytes(32).toString("hex");
    this.verificationToken = crypto.createHash("sha256").update(token).digest("hex");
    this.verificationTokenExpires = Date.now() + 60 * 60 * 1000; // 1 hour
    return token;
}

const User = mongoose.model("User", userSchema);
module.exports = User;