
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import DisplayBlog from './DisplayBlog';
import { getData } from './getData.js';
import GetUserBlog from './getUserBlogById'


export default function ShowJustUserBlogs() {
    const { userName } = useParams();
    const [{ users, blogs }, setState] = useState({
        users: '', blogs: []
    })
    useEffect(() => {
        (async () => {
            const users = await getData(`users`);
            const foundUser = users.find(user => user.name === userName);
            const blogs = await GetUserBlog(foundUser);
            setState({ users: [foundUser], blogs: blogs })
        })();
    }, [userName])


    const loadBlogs = blogs.map(blogLoad => <DisplayBlog key={blogLoad.title} blog={blogLoad} users={users} />);

    return (
        <div id='allBlogsDisplay'>
            <span>{`Titles By ${userName}:`}</span>
            {loadBlogs}

        </div>
    )
}




