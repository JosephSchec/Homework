import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
export default function DisplayBlog(props) {
    const { blog, users } = props;

    const author = users.filter(user => user.id === blog.userId);

    return (
        <div id={blog.id} className='blogDetails'>
            <h3>Title: {blog.title} </h3>
            <h5>By : {author[0].name} </h5>
            <Link to={`/blog/${blog.id}`} >
                <button className="displayBlog" >Display Blog</button>
            </Link>
        </div>
    )
}

DisplayBlog.propTypes = {
    blog: PropTypes.object.isRequired,
    users: PropTypes.array.isRequired
}