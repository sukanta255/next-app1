// src/app/api/todos/route.js
let TODOS = [
  { id: '1', text: 'Demo API todo', completed: false, createdAt: new Date().toISOString() }
]

export async function GET() {
  return new Response(JSON.stringify(TODOS), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  })
}

export async function POST(request) {
  try {
    const body = await request.json()
    if (!body?.text) return new Response(JSON.stringify({ error: 'Missing text' }), { status: 400 })

    const newTodo = { id: Date.now().toString(), text: body.text, completed: false, createdAt: new Date().toISOString() }
    TODOS.unshift(newTodo)
    return new Response(JSON.stringify(newTodo), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
}
