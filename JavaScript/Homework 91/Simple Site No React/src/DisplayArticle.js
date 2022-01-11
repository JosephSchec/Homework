import { getData } from "./index.js";
import showComments from "./ShowComments.js";


export default async function getArticleById(id) {
    const parent = document.getElementById("allBlogsDisplay");
    while (parent.firstChild) {
        parent.firstChild.remove()
    }

    const thisBlogData = await getData(`posts?id=${id}`);
    const blog = thisBlogData[0];

    const showBlog = document.createElement('div');
    showBlog.innerHTML = `<div id="blogArticle">
                                    <h3><span>Title:</span>  ${blog.title} </h4>
                                    <article id='article'><span>Article:</span> ${blog.body}</article>
                                    <button id="displayComments">Display Comments</button>
                                   </div>`
    parent.appendChild(showBlog);

    showBlog.style.alignSelf = 'flex-start';
    showBlog.style.width = '50%';

    const displayComments = document.getElementById('displayComments');
    let show=true;
    displayComments.addEventListener('click', async function () {
        if (show) {
            showComments(id);
            displayComments.innerText = 'Hide Comments'
            show=false;
        }
        else {
            displayComments.innerText = 'Display Comments';
            document.getElementById('allComments').remove();
            show=true;
        }
    });


}