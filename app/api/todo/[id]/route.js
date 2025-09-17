import { todos } from "../route"; 


export async function GET(req, { params }) {
  const { id } = params;
  const todo = todos.find((t) => t.id === id);

  if (!todo) {
    return Response.json({ error: "Todo not found" }, { status: 404 });
  }

  return Response.json(todo);
}


export async function PUT(req, { params }) {
  const { id } = params;
  let body;

  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  let updatedTodo = null;
  todos.forEach((t, i) => {
    if (t.id === id) {
      updatedTodo = { ...t, ...body };
      todos[i] = updatedTodo;
    }
  });

  if (!updatedTodo) {
    return Response.json({ error: "Todo not found" }, { status: 404 });
  }

  return Response.json(updatedTodo);
}


export async function DELETE(req, { params }) {
  const { id } = params;
  const index = todos.findIndex((t) => t.id === id);

  if (index === -1) {
    return Response.json({ error: "Todo not found" }, { status: 404 });
  }

  todos.splice(index, 1); 
  return Response.json({ success: true });
}
