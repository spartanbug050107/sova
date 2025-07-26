import { createStreamUser } from "../lib/stream.js";
import User from "../models/user.js";
import jwt from 'jsonwebtoken'

export async function signup(req, res) {
    const {email, password, fullname} = req.body

    try {
        
        if(!email || !password || !fullname) {
            return res.status(400).json({message: "All fields are required"});
        }

        if(password.length < 6) {
            return res.status(400).json({message: "Password must be at least 6 characters"});
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.status(400).json({message: "The email address is already associated with an existing account"});
        }

        const idx = Math.floor(Math.random() * 100) + 1;  // 1-100
        const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`

        const newUser = await User.create({
            email,
            fullname,
            password,
            profilePic: randomAvatar,
        })

        try {
            await createStreamUser({
                id: newUser._id.toString(),
                name: newUser.fullname,
                image: newUser.profilePic || ""
            })
            console.log(`${newUser.fullname} Stream user created`);
        } catch (error) {
            console.log("Error occured in creating user", error)
        }

        const token = jwt.sign({userId: newUser._id},process.env.JWT_SECRET_KEY, {
            expiresIn: "7d"
        })

        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production"
        })

        res.status(201).json({success: true, user: newUser})
    } catch (error) {
        console.log("Error in signup", error);
        res.status(500).json({message: "Internal server error"});
    }
}

export async function login(req, res) {
    try {

        const {email, password} = req.body;

        if(!email || !password) {
            return res.status(400).json({message: "All fields are required"});
        }

        const user = await User.findOne({email});
        if(!user) return res.status(401).json({message: "User not found"});

        const isPassword = await user.matchPassword(password)
        if(!isPassword) {
            return res.status(401).json({message: "Invalid email or password"})
        }

        const token = jwt.sign({userId: user._id},process.env.JWT_SECRET_KEY, {
            expiresIn: "7d"
        })

        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
        })

        res.status(200).json({success: true, user});
    } catch (error) {
        console.log("Error in login ", error.message)
        res.status(500).json({message: "Internal server error"});
    }
}

export function logout(req, res) {
    res.clearCookie("jwt")
    res.status(200).json({success: true, message: "Logout successfully"});
}

export async function userSetup(req, res) {
    try {
        const userId = req.user._id;

        const {fullname, bio, nativeLanguage, learningLanguage, location} = req.body

        if(!fullname || !bio || !nativeLanguage || !learningLanguage || !location) {
            return res.status(400).json({
                message: "All fields are required",
                missingFields: [
                    !fullname && "fullname",
                    !bio && "bio",
                    !nativeLanguage && "nativeLanguage",
                    !learningLanguage && "learningLanguage",
                    !location && "location",
                ].filter(Boolean),
            })
        }

        const updatedUser = await User.findByIdAndUpdate(userId, {
            ...req.body,
            hasCompletedSetup: true,
        }, {new: true})

        if(!updatedUser) {
            return res.status(400).json({message: "User not found"});
        }

        try {
            await createStreamUser({
                id: updatedUser._id.toString(),
                name: updatedUser.fullname,
                image: updatedUser.profilePic || "",
            })
            console.log(`Stream user updated after Setup for ${updatedUser.fullname}`);
        } catch (streamerror) {
            console.log("Error updating Stream user during Setup", streamerror.message);
            
        }

        res.status(200).json({success: true, user: updatedUser})
    } catch (error) {
        console.log("Setup Error", error);
        res.status(500).json({message: "Internal server error"});
    }
}