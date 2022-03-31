import React, { useEffect, useState } from 'react'
import Post from './Post';
import socketIo from 'socket.io-client';
export default function Posts({ setError ,skip,limit }) {
    const [posts, setPosts] = useState([]);
  
    useEffect(() => {
      (async () => {
        const response = await fetch(`http://localhost:8080/posts/${skip}/${limit}`, {
          credentials: 'include',
        });
        const posts = await response.json();
        setPosts(posts);
      })();
    }, [skip,limit]);
  
    useEffect(() => {
      const socket = socketIo("http://localhost:8080");
      socket.on('comment', commentData => {
        const newPosts = [...posts];
        const postIndex = newPosts.findIndex(p => p._id === commentData.postId);
        const postCopy = { ...newPosts[postIndex] };
        postCopy.comments = postCopy.comments || [];
        postCopy.comments.push(commentData.comment);
        newPosts[postIndex] = postCopy;
        setPosts(newPosts);
      });
    }, [posts]);
  
    return (
      <div>
        {posts.map(p => (<Post key={p._id} post={p} setError={setError} />))}
      </div>
    )
  }
