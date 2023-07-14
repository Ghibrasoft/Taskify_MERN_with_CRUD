import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UserModel } from "../models/UserModel.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { TodoModel } from "../models/TodoModel.js";

dotenv.config();
const router = express.Router();

// register
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // checking if the user exists and return response
    const user = await UserModel.findOne({
      $or: [{ username }, { email }],
    });
    if (user) return res.status(409).json({ message: "User already exists!" });

    // hashing password
    const hashedPassword = await bcrypt.hash(password, 10);

    // creating new user
    const newUser = new UserModel({
      username,
      email,
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
    const user = await UserModel.findOne({
      $or: [{ username }, { email: username }],
    });
    if (!user) return res.status(404).json({ message: "User doesn't exists!" });

    // checking password matching
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Incorrect password" });

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

// GET current user
router.get("/user", verifyToken, async (req, res) => {
  const token = req.headers.authorization;
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const currUser = await UserModel.findById(decodedToken.id);

    res.json(currUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// PUT profile image
router.put("/profileimage", async (req, res) => {
  const { imageURL, userID } = req.body;

  try {
    const user = await UserModel.findById(userID);
    if (!user) return res.status(404).json({ message: "User not found!" });

    const updatedUserAvatar = await UserModel.findByIdAndUpdate(
      userID,
      { avatar: imageURL },
      { new: true }
    );
    res.status(200).json({ updatedUserAvatar });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// PUT change user password
router.put("/changepassword", async (req, res) => {
  const { oldPass, newPass, userID } = req.body;
  try {
    // find current user
    const currUser = await UserModel.findById(userID);
    if (currUser) {
      const isPasswordNew = await bcrypt.compare(oldPass, currUser.password);

      // if password is different
      if (isPasswordNew) {
        const newHashedPassword = await bcrypt.hash(newPass, 10);

        const updatedUser = await UserModel.findByIdAndUpdate(
          userID,
          { password: newHashedPassword },
          { new: true }
        );

        // generate new jwt
        const newToken = jwt.sign({ id: userID }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });

        res.json({ newToken, updatedUser });
      } else {
        res.status(401).json({ message: "Invalid old password!" });
      }
    } else {
      res.status(404).json({ message: "User not found!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error!" });
  }
});

// DELETE curr user account
router.delete("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    // finding current user
    const currUser = await UserModel.findById(userId);
    if (!currUser) return res.status(404).json({ message: "User not found!" });
    const { userTodos } = currUser;

    // deleting todos and user
    await TodoModel.deleteMany({ _id: { $in: userTodos } });
    const deletedUser = await UserModel.findByIdAndDelete(userId);
    if (!deletedUser)
      return res.status(404).json({ message: "User not found!" });

    res.json({ message: "User and associated todos deleted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error!" });
  }
});

export { router as UsersRouter };
