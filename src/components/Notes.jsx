import React from 'react'
import Note from './Note'

const Notes = ({ docs }) => {
  return (
    <ul>
      {
        docs.map( doc => (
          <Note key={doc.id} note={doc} />
        ))
      }
    </ul>
  )
}

export default Notes
