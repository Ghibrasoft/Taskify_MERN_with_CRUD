import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  todo: { type: String, required: true },
  pending: { type: Boolean, default: true },
  done: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  userOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

export const TodoModel = mongoose.model("todos", TodoSchema);
