import { getData } from "./index.js";
import getArticleById from "./DisplayArticle.js";

export default async function getByUserId(userId) {

    const parent = document.getElementById("allBlogsDisplay");
    while (parent.firstChild) {
        parent.firstChild.remove()
    }

    const allBlogsDisplay = document.getElementById('allBlogsDisplay')
    /*get all users */
    const users = await getData('users');
    const usersArr = users.map(user => ({ id: user.id, name: user.name, website: user.website, companyInfo: user.company }));


    /*all blogs and display*/
    const blogs = await getData(`posts?userId=${userId}`);
    const blogsArr = blogs.map(blog => ({ userId: blog.userId, id: blog.id, title: blog.title }));


    blogsArr.forEach(blog => {
        const author = usersArr.filter(user => user.id === blog.userId);

        const blogDisplay = document.createElement('div');
        blogDisplay.id = blog.id;
        blogDisplay.className = 'blog';
        blogDisplay.innerHTML = `<div id="blogDetails">
                                    <h3>Title: ${blog.title} </h4>
                                    <h5>By : ${author[0].name} </h6>
                                    <button class="displayBlog">Display Blog</button>
                                   </div>`
        allBlogsDisplay.appendChild(blogDisplay);
    });

    const displayBlog = document.getElementsByClassName('displayBlog');

    [...displayBlog].forEach(button => {
        button.addEventListener('click', async function () {
            getArticleById(this.parentNode.parentNode.id);
            document.getElementById('back').style.visibility='visible';

        });
    });

    allBlogsDisplay.style.alignContent = 'flex-start';
    allBlogsDisplay.style.gridColumn = '2/5'
    allBlogsDisplay.style.marginRight = '1em'
}