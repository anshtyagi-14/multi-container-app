const express = require("express");
const mongoose = require("mongoose");
const Todo = require("./models/Todo");

const app = express();
app.use(express.json());

// IMPORTANT: use service name "mongo"
mongoose.connect("mongodb://mongo:27017/todos")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));


// GET all
app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json({
    version: "v2",
    data: todos
  });
});

// CREATE
app.post("/todos", async (req, res) => {
  const todo = new Todo(req.body);
  await todo.save();
  res.json(todo);
});

// GET by id
app.get("/todos/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  res.json(todo);
});

// UPDATE
app.put("/todos/:id", async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(todo);
});

// DELETE
app.delete("/todos/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

app.listen(3000, () => console.log("Server running on port 3000"));