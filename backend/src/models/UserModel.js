import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userTodos: [{ type: mongoose.Schema.Types.ObjectId, ref: "todos" }],
});

export const UserModel = mongoose.model("users", UserSchema);
