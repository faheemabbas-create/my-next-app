const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

let todos = []; 

app.get("/todos", (req, res) => {
  res.json(todos);
});

app.post("/todos", (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Text is required" });
  const newTodo = { id: Date.now(), text, done: false };
  todos.push(newTodo);
  res.json(newTodo);
});

app.put("/todos/:id", (req, res) => {
  const { id } = req.params;
  todos = todos.map(todo =>
    todo.id == id ? { ...todo, done: !todo.done } : todo
  );
  res.json({ success: true });
});

app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;
  todos = todos.filter(todo => todo.id != id);
  res.json({ success: true });
});

app.delete("/todos", (req, res) => {
  todos = [];
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
