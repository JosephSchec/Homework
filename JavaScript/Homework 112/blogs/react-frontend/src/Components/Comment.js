import React from 'react'
import '../Styles/Comment.css';
export default function Comment({ comment: { author, date, body } }) {
    return (
      <div className='comment'>
        <h2>{body}</h2>
        <h3>by {author} on {new Date(date).toLocaleString()}</h3>
      </div>
    )
  }