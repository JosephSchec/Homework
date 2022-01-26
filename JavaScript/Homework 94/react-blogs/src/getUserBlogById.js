
import { getData } from './getData.js';

export default async function GetUserBlog(user) {
    
    const blogToGet = await getData(`posts?userId=${user.id}`);
    
    const blogsArr = blogToGet.map(blog => ({ userId: blog.userId, id: blog.id, title: blog.title }));

    return await blogsArr;
}




