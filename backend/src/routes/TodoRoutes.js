import express from "express";
import { TodoModel } from "../models/TodoModel.js";

const router = express.Router();

// GET all todos
router.get("/todos", async (req, res) => {
  try {
    const todos = await TodoModel.find({});
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

// PUT toggle current todo
router.put("/todos/:_id/:status", async (req, res) => {
  const { _id, status } = req.params;
  let completed;

  if (status === "done") {
    completed = true;
  } else if (status === "undo") {
    completed = false;
  } else {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    const currTodo = await TodoModel.findByIdAndUpdate(
      _id,
      { completed },
      { new: true }
    );
    res.json(currTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// DELETE todo
router.delete("/todos/:_id", async (req, res) => {
  const { _id } = req.params;
  try {
    await TodoModel.deleteOne({ _id });
  } catch (error) {
    console.error(error);
  }
});

export { router as TodosRouter };
