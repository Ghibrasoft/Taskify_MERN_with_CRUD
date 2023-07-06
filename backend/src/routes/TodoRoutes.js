import express from "express";
import { TodoModel } from "../models/TodoModel.js";

const router = express.Router();

// GET all todos
router.get("/todos", async (req, res) => {
  try {
    const todos = await TodoModel.find({}).sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error (GET)" });
  }
});

// POST todo
router.post("/todos", async (req, res) => {
  const { todo } = req.body;
  try {
    const newTodo = new TodoModel({
      todo,
    });

    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error (POST)" });
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

    res.json({ message: "Task deleted" });
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: "Task not found" });
  }
});

export { router as TodosRouter };
