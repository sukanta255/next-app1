// src/components/TodoList.jsx
'use client'
import React from 'react'
import TodoItem from './TodoItem'

export default function TodoList({ todos = [], onToggle, onDelete, onEdit }) {
  if (!todos || todos.length === 0) {
    return <p className="empty">No todos yet — add your first one above.</p>
  }

  return (
    <ul className="todo-list" role="list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={() => onToggle(todo.id)}
          onDelete={() => onDelete(todo.id)}
          onEdit={(newText) => onEdit(todo.id, newText)}
        />
      ))}
    </ul>
  )
}
