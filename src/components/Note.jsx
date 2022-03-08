import React from 'react'

const Note = ({ note }) => {
  return (
    <li>
      ID: {note.id}, TITLE: {note.title || 'empty'}, DATE: {note.date}
    </li>
  )
}

export default Note
