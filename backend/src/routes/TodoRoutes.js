import express from "express";
import { TodoModel } from "../models/TodoModel.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { UserModel } from "../models/UserModel.js";

const router = express.Router();

// GET user's todos
router.get("/todos", verifyToken, async (req, res) => {
  const { userOwner } = req.query;
  try {
    const todos = await TodoModel.find({ userOwner }).sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    res.json(error);
    console.error(error);
  }
});

// POST user's todos
router.post("/todos", async (req, res) => {
  const { userOwner, todo } = req.body;

  try {
    // finding user who created todo by ID
    if (!userOwner) res.status(400).json({ error: "Missing userOwner value" });
    const user = await UserModel.findById(userOwner);

    // creating and saving new todo
    const newTodo = new TodoModel({
      todo,
      userOwner,
    });
    const savedTodo = await newTodo.save();

    user.userTodos.push(savedTodo);
    await user.save();

    res.json({ userTodos: user.userTodos });
  } catch (error) {
    res.json(error);
    console.error(error);
  }
});

// PUT curr todo
router.put("/todos/:_id", async (req, res) => {
  const { _id } = req.params;
  const { editedTodo } = req.body;

  try {
    const updatedTodo = await TodoModel.findByIdAndUpdate(
      { _id },
      { todo: editedTodo },
      { new: true }
    );

    res.json(updatedTodo);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Task not found" });
  }
});
// PUT toggle current todo (done/undone)
router.put("/todos/:_id/:status", async (req, res) => {
  const { _id, status } = req.params;
  let pending;
  let done;

  switch (status) {
    case "inprogress":
      pending = false;
      break;
    case "pending":
      pending = true;
      break;
    case "done":
      done = true;
      break;
    case "undo":
      done = false;
      break;
    default:
      return res.status(400).json({ message: "Invalid status" });
  }

  try {
    const currTodo = await TodoModel.findByIdAndUpdate(
      _id,
      { pending, done },
      { new: true }
    );
    res.json(currTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// DELETE todo
router.delete("/todos", async (req, res) => {
  const { ids } = req.body;
  try {
    await TodoModel.deleteMany({ _id: { $in: ids } });
    await UserModel.updateMany(
      { userTodos: { $in: ids } },
      { $pull: { userTodos: { $in: ids } } }
    );

    res.json({ message: "Task deleted" });
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: "Task not found" });
  }
});

export { router as TodosRouter };
