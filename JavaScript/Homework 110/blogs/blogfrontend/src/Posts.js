import React, { useEffect, useState } from 'react'

export default function Posts() {
    const [posts, setPosts] = useState('');
    useEffect(() => {
        (async () => {
            const r = await fetch('/posts', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            });
            if (!r.ok) {
                throw new Error('didnt get')
            } else {

                setPosts(await r.json());
            }
        })();
    }, [])
   
    return (<>

        <div className='blogs'>First blog by yossi says: " {posts ? posts['find'].blog : ''} "</div>
    </>
    )
}
