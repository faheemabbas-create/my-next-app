
export let todos = [];


export async function GET() {
  return Response.json(todos);
}


export async function POST(req) {
  const { text } = await req.json();
  const newTodo = { id: Date.now().toString(), text, done: false };
  todos.push(newTodo);
  return Response.json(newTodo, { status: 201 });
}


export async function DELETE() {
  todos = [];
  return Response.json({ success: true });
}
