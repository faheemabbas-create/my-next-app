"use client";
import { useState, useEffect } from "react";

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  // ✅ Fetch from Next.js API (no localhost:4000 needed)
  useEffect(() => {
    fetch("/api/todo")
      .then((res) => res.json())
      .then(setTodos)
      .catch((err) => console.error("Failed to get", err));
  }, []);

  const addTodo = async () => {
    if (text.trim() === "") return;
    const res = await fetch("/api/todo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const newTodo = await res.json();
    setTodos([...todos, newTodo]);
    setText("");
  };

  const toggleTodo = async (id) => {
    await fetch(`/api/todo/${id}`, { method: "PUT" });
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const removeTodo = async (id) => {
    await fetch(`/api/todo/${id}`, { method: "DELETE" });
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const clearAll = async () => {
    await fetch("/api/todo", { method: "DELETE" });
    setTodos([]);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4">
          My To-Do List
        </h1>

        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter a task."
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
            className="flex-1 border border-gray-300 rounded-xl px-3 py-2 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button
            onClick={addTodo}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-sm sm:text-base"
          >
            Add
          </button>
        </div>

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
                  className={`text-sm sm:text-base ${
                    todo.done ? "line-through text-gray-400" : ""
                  }`}
                >
                  {todo.text}
                </span>
              </div>
              <button
                onClick={() => removeTodo(todo.id)}
                className="text-red-500 hover:text-red-700 ml-2 text-xs sm:text-sm"
              >
                DEL
              </button>
            </li>
          ))}
        </ul>

        {todos.length > 0 && (
          <button
            onClick={clearAll}
            className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl text-sm sm:text-base"
          >
            Clear All
          </button>
        )}
      </div>
    </div>
  );
}
