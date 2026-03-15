import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model";


const JWT_SECRET = process.env.JWT_SECRET;

export const signin = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        //check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) { 
            res.status(400).json({ message: "Invalid credentials, wrong password" });
            return;
        }

        //create token
        const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET!, { expiresIn: "1d" });
        res.status(200).json({
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name
            }
        });
    }catch (error) {
        console.error("Error during signin:", error);
        res.status(500).json({ message: "Server error" });
    }
}

export const initiateAdmin = async(req: Request, res: Response): Promise<void> => {
    try {
        const { email, password, name } = req.body;

        const count = await User.countDocuments({});
        if (count > 0) {
            res.status(400).json({ message: "Admin already exists" });
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            email,
            password: hashedPassword,
            name,
        })

        await newUser.save();

        res.status(201).json({ message: "Admin user created successfully" });
    }catch (error) {
        console.error("Error during admin initiation:", error);
        res.status(500).json({ message: "Server error" });
    }
}