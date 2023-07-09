import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { TodosRouter } from "./routes/TodoRoutes.js";
import { UsersRouter } from "./routes/UserRoutes.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use("/", TodosRouter);
app.use("/auth", UsersRouter);

mongoose.connect(
  `mongodb+srv://dgibradze:${process.env.MONGODB_PASS}@todos.cd79xob.mongodb.net/todos?retryWrites=true&w=majority`
);

app.get("/", async (req, res) => {
  res.json("Hi there");
});

app.listen(3001, () => {
  console.log("Server is running!");
});
