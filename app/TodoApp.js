"use client";
import { useState, useEffect } from "react";

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  // Load todos from Express when component mounts
  useEffect(() => {
    fetch("http://localhost:4000/todos")
      .then((res) => res.json())
      .then(setTodos)
      .catch((err) => console.error("Failed to fetch todos", err));
  }, []);

  const addTodo = async () => {
    if (text.trim() === "") return;
    const res = await fetch("http://localhost:4000/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const newTodo = await res.json();
    setTodos([...todos, newTodo]);
    setText("");
  };

  const toggleTodo = async (id) => {
    await fetch(`http://localhost:4000/todos/${id}`, { method: "PUT" });
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const removeTodo = async (id) => {
    await fetch(`http://localhost:4000/todos/${id}`, { method: "DELETE" });
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const clearAll = async () => {
    await fetch("http://localhost:4000/todos", { method: "DELETE" });
    setTodos([]);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-center mb-4">My ToDo List</h1>

        {/* Input + Add Button */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter a task..."
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
            className="flex-1 border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button
            onClick={addTodo}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl"
          >
            Add
          </button>
        </div>

        {/* Clear All */}
        {todos.length > 0 && (
          <div className="flex justify-end mb-4">
            <button
              onClick={clearAll}
              className="text-sm text-red-500 hover:text-red-700"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Todo List */}
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between bg-gray-50 border p-3 rounded-xl"
            >
              <div className="flex items-center gap-2 flex-1">
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => toggleTodo(todo.id)}
                  className="w-4 h-4 accent-blue-500 cursor-pointer"
                />
                <span
                  className={`${
                    todo.done ? "line-through text-gray-400" : ""
                  }`}
                >
                  {todo.text}
                </span>
              </div>
              <button
                onClick={() => removeTodo(todo.id)}
                className="text-red-500 hover:text-red-700 ml-2"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
