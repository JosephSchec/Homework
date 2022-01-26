
import React, { useState, useEffect } from 'react'
import DisplayBlog from './DisplayBlog';
import { getData } from './getData.js'
export default function DisplayAllBlogs() {

    const [state, setState] = useState({
        users: [],
        blogs: [],
        startThree: 0,
        endThree: 3
    });

    useEffect(() => {
        (async () => {
            const users = await getData('users');
            const usersArr = users.map(user => ({ id: user.id, name: user.name, website: user.website, companyInfo: user.company }));
            const blogs = await getData('posts');
            const blogsArr = blogs.map(blog => ({ userId: blog.userId, id: blog.id, title: blog.title }));

            setState({
                ...state,
                users: usersArr,
                blogs: blogsArr
            });
        })();
    }, [])
    const { startThree, endThree, blogs, users } = state;

    const prevButton = () => {
        if (endThree > 3) {
            setState({
                ...state,
                startThree: startThree - 3,
                endThree: endThree - 3
            })
        }
    }


    const nextButton = () => {
        if (endThree < blogs.length) {
            setState({
                ...state,
                startThree: startThree + 3,
                endThree: endThree + 3
            })
        }
    }

    const blogsThree = blogs.slice(startThree, endThree);
    const loadBlogs = blogsThree.map(blogLoad => <DisplayBlog key={blogLoad.title} blog={blogLoad} users={users} />);

    return (
        <div id='allBlogsDisplay'>
            <span>{'Awesome Blog Titles:'}</span>
            {loadBlogs}
            <div id='buttonDisplay'>
                <button onClick={prevButton}>Previous</button>
                <button onClick={nextButton}>Next</button>
            </div>
        </div>
    )
}

