import React, { useState } from 'react'

export default function AddComment({ id, endCommenting }) {
    const [commentBody, setCommentBody] = useState('');
    const addComment = async () => {
        try {
          const response = await fetch(`http://localhost:8080/posts/${id}/addComment`, {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({body: commentBody})
          });
    
          if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
          }
    
          endCommenting();
        } catch (error) {
          console.error(error);
        }
      };
    return (
        <div>
            <input name="body" value={commentBody} onChange={e => setCommentBody(e.target.value)} />
            <button onClick={addComment}>add</button>
            <button onClick={endCommenting}>cancel</button>
        </div>
    )
}
