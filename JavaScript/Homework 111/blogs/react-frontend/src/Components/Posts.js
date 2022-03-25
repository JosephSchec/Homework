import React, { useEffect, useState } from 'react'
import Post from './Post';
export default function Posts() {
    const [posts, setPost] = useState([]);
    useEffect(() => {
        (async () => {
            try {
                const r = await fetch('http://localhost:8080/posts')
                if (!r.ok) {
                    throw new Error('No post found')
                }
                const p = await r.json();
                setPost(p);
            } catch (error) {
                console.log(error)
            }
        })();
    }, []);
    return (
        <div>{posts.map(post => <Post key={post._id} post={post}/>)}</div>
    )
}
