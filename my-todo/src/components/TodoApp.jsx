// src/components/TodoApp.jsx
'use client'
import React, { useEffect, useState } from 'react'
import TodoInput from './TodoInput'
import TodoList from './TodoList'

const STORAGE_KEY = 'my-todo-list-v1'

export default function TodoApp() {
  const [todos, setTodos] = useState([])

  // load from localStorage on mount
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (raw) setTodos(JSON.parse(raw))
    } catch (e) {
      console.error('Failed to load todos', e)
    }
  }, [])

  // persist whenever todos change
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
    } catch (e) {
      console.error('Failed to save todos', e)
    }
  }, [todos])

  function addTodo(text) {
    const trimmed = text?.trim()
    if (!trimmed) return
    const newTodo = {
      id: Date.now().toString(),
      text: trimmed,
      completed: false,
      createdAt: new Date().toISOString(),
    }
    setTodos(prev => [newTodo, ...prev])
  }

  function toggleTodo(id) {
    setTodos(prev => prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)))
  }

  function deleteTodo(id) {
    setTodos(prev => prev.filter(t => t.id !== id))
  }

  function editTodo(id, newText) {
    const trimmed = newText?.trim()
    if (!trimmed) return
    setTodos(prev => prev.map(t => (t.id === id ? { ...t, text: trimmed } : t)))
  }

  function clearCompleted() {
    setTodos(prev => prev.filter(t => !t.completed))
  }

  return (
    <div className="app-shell">
      <div className="container" role="application" aria-label="Todo App">
        <header className="header">
          <h1>Next.js (App Router) Todo</h1>
          <div className="hint">Persistent to your browser via <code>localStorage</code></div>
        </header>

        <TodoInput onAdd={addTodo} />

        <div className="controls">
          <button className="btn ghost" onClick={clearCompleted}>Clear completed</button>
          <div className="hint">{todos.length} item(s)</div>
        </div>

        <TodoList
          todos={todos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
        />
      </div>
    </div>
  )
}
