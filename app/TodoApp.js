"use client";

import { useEffect, useState } from "react";

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("todos") || "[]");
      if (Array.isArray(saved)) setTodos(saved);
    } catch (e) {
      console.error("Failed reading: ", e);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function addTodo(e) {
    e?.preventDefault?.();
    const value = text.trim();
    if (!value) return;
    const newTodo = { id: Date.now(), text: value, completed: false };
    setTodos((prev) => [...prev, newTodo]);
    setText("");
  }

  function toggleTodo(id) {
    setTodos((prev) => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  }

  function deleteTodo(id) {
    setTodos((prev) => prev.filter(t => t.id !== id));
  }

  function clearAll() {


    
    setTodos([]);
  }

  return (
    <div className="card">
      <h1>ToDo app </h1>

      <form className="form-row" onSubmit={addTodo}>
        <input
          type="text"
          placeholder="Add a task..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" disabled={!text.trim()}>Add</button>
      </form>

      {todos.length === 0 ? (
        <p className="small">No tasks — add your first task.</p>
      ) : (
        <>
          <ul>
            {todos.map(todo => (
              <li key={todo.id}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.95rem' }}>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                  />
                  <span className={`todo-text ${todo.completed ? "done" : ""}`}>
                    {todo.text}
                  </span> </label>

                <div>
                  <button className="icon-btn" onClick={() => deleteTodo(todo.id)} title="Delete"> DEL </button>
                </div>
              </li>
            ))}
          </ul>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.75rem' }}>

          </div>
          <div>
            <button onClick={clearAll} className="icon-btn">Clear All</button>
          </div>
        </>
      )}

    </div>
  );
}
