import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const isModified = async () => {

}

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,         //
    },
    email: {
        type: String,
        required: true,
        unique: true,         //
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    bio: {
        type: String,
        default: "",
    },
    profilePic: {
        type: String,
        default: "",
    },
    nativeLanguage: {
        type: String,
        default: "",
    },
    learningLanguage: {
        type: String,
        default: "",
    },
    location: {
        type: String,
        default: "",
    },
    hasCompletedSetup: {
        type: Boolean,
        default: false,
    },
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ]
}, {timestamps: true});

// Encrypting password text to hash format
userSchema.pre("save", async function(next) {

    if(!this.isModified("password")) return next();
    
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }       
});

userSchema.methods.matchPassword = async function(pass) {
    const isPass = await bcrypt.compare(pass, this.password);
    return isPass;
}

const User = mongoose.model("User", userSchema)

export default User;