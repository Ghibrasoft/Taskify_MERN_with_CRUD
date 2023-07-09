import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UserModel } from "../models/UserModel.js";

dotenv.config();
const router = express.Router();

// register
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    // checking if the user exists and return response
    const user = await UserModel.findOne({ username });
    if (user) return res.status(409).json({ message: "User already exists!" });

    // hashing password
    const hashedPassword = await bcrypt.hash(password, 10);

    // creating new user
    const newUser = new UserModel({
      username,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(200).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // checking if the user exists and return response
    const user = await UserModel.findOne({ username });
    if (!user) return res.status(404).json({ message: "User doesn't exist!" });

    // checking password matching
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res
        .status(401)
        .json({ message: "Incorrect Username or Password" });

    // generate jwt
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token, userID: user._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export { router as UsersRouter };
