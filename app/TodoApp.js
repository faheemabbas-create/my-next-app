"use client";
import { useState } from "react";

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  const addTodo = () => {
    if (text.trim() === "") return;
    setTodos([...todos, { text, done: false }]);
    setText("");
  };

  const toggleTodo = (index) => {
    setTodos(
      todos.map((todo, i) =>
        i === index ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const removeTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const clearAll = () => {
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
          {todos.map((todo, i) => (
            <li
              key={i}
              className="flex items-center justify-between bg-gray-50 border p-3 rounded-xl"
            >
              <div className="flex items-center gap-2 flex-1">
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => toggleTodo(i)}
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
                onClick={() => removeTodo(i)}
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
