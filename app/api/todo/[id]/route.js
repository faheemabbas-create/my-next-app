let todos = [];

export async function PUT(req, context) {
  const { id } = await context.params; // 👈 await here
  todos = todos.map((t) =>
    t.id === id ? { ...t, done: !t.done } : t
  );
  return Response.json({ success: true });
}

export async function DELETE(req, context) {
  const { id } = await context.params; // 👈 await here
  todos = todos.filter((t) => t.id !== id);
  return Response.json({ success: true });
}
