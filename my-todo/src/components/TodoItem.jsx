// src/components/TodoItem.jsx
'use client'
import React, { useEffect, useState } from 'react'

export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(todo.text)

  // keep draft in sync if todo.text changes externally
  useEffect(() => {
    setDraft(todo.text)
  }, [todo.text])

  function saveEdit() {
    const t = draft.trim()
    if (!t) return
    onEdit(t)
    setEditing(false)
  }

  return (
    <li
      className="todo-item"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        borderRadius: 8,
        background: '#fff',
        border: '1px solid #eef2f7'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1 }}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={onToggle}
          aria-label={`Mark ${todo.text} ${todo.completed ? 'incomplete' : 'complete'}`}
        />

        {editing ? (
          <input
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') saveEdit()
              if (e.key === 'Escape') { setEditing(false); setDraft(todo.text) }
            }}
            style={{ flex: 1, padding: 8, borderRadius: 6, border: '1px solid #e6e7eb' }}
            autoFocus
          />
        ) : (
          <span style={{ color: todo.completed ? '#9ca3af' : '#111827', textDecoration: todo.completed ? 'line-through' : 'none' }}>
            {todo.text}
          </span>
        )}
      </div>

      <div style={{ display: 'flex', gap: 8, marginLeft: 12 }}>
        {editing ? (
          <>
            <button onClick={saveEdit} className="btn primary">Save</button>
            <button onClick={() => { setEditing(false); setDraft(todo.text) }} className="btn ghost">Cancel</button>
          </>
        ) : (
          <>
            <button onClick={() => setEditing(true)} className="btn">Edit</button>
            <button onClick={onDelete} className="btn danger">Delete</button>
          </>
        )}
      </div>
    </li>
  )
}
