// src/components/TodoInput.jsx
'use client'
import React, { useState } from 'react'

export default function TodoInput({ onAdd }) {
  const [text, setText] = useState('')

  function submit(e) {
    e.preventDefault()
    if (!text.trim()) return
    onAdd(text)
    setText('')
  }

  return (
    <form onSubmit={submit} style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Add a todo and press Enter"
        aria-label="New todo"
        style={{
          flex: 1,
          padding: '10px 12px',
          border: '1px solid #e6e7eb',
          borderRadius: 8,
          fontSize: 15
        }}
      />
      <button type="submit" className="btn primary">Add</button>
    </form>
  )
}
