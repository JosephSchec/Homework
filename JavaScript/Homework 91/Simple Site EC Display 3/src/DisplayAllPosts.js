import { getData } from "./index.js";
import getArticleById from "./DisplayArticle.js";

(async function display() {
    const center = document.getElementById('center');
    /*get all users */
    const users = await getData('users');
    const usersArr = users.map(user => ({ id: user.id, name: user.name, website: user.website, companyInfo: user.company }));


    /*all blogs and display*/
    const blogs = await getData('posts');
    const blogsArr = blogs.map(blog => ({ userId: blog.userId, id: blog.id, title: blog.title }));


    function displaBlogsByThree(firstNum, SecondNum) {
        const parent = document.getElementById("allBlogsDisplay");

        if (parent) {
            parent.remove()
        }
        const allBlogsDisplay = document.createElement('div');
        allBlogsDisplay.id = 'allBlogsDisplay';
        allBlogsDisplay.innerHTML = "<span>Awesome Blog Titles:</span>"
        center.appendChild(allBlogsDisplay);
        const blogsThree = blogsArr.slice(firstNum, SecondNum);
        blogsThree.forEach(blog => {
            const author = usersArr.filter(user => user.id === blog.userId);

            const blogDisplay = document.createElement('div');
            blogDisplay.id = blog.id;
            blogDisplay.className = ' blogDetails';
            blogDisplay.innerHTML = `<h3>Title: ${blog.title} </h4>
                                    <h5>By : ${author[0].name} </h6>
                                    <button class="displayBlog">Display Blog</button>
                                    `
            allBlogsDisplay.appendChild(blogDisplay);
        });

        const buttonsDisplay = document.createElement('div');
        buttonsDisplay.id = 'buttonDisplay';
        allBlogsDisplay.appendChild(buttonsDisplay);

        const prevButton = document.createElement('button');
        prevButton.id = 'prev';
        prevButton.innerText = 'Previous';
        buttonsDisplay.appendChild(prevButton);

        prevButton.addEventListener('click', () => {
            if (endThree > 3) {
                startThree -= 3;
                endThree -= 3;
                displaBlogsByThree(startThree, endThree);
            }
        });

        const nextButton = document.createElement('button');
        nextButton.id = 'next';
        nextButton.innerText = 'Next';
        buttonsDisplay.appendChild(nextButton);

        nextButton.addEventListener('click', () => {
            let temp = endThree;
            startThree = temp;
            endThree += 3;
            if (endThree < blogsArr.length) {
                displaBlogsByThree(startThree, endThree);
            }
        });
    }

    let startThree = 0;
    let endThree = 3;
    displaBlogsByThree(startThree, endThree);


    const displayBlog = document.getElementsByClassName('displayBlog');

    [...displayBlog].forEach(button => {
        button.addEventListener('click', async function () {
            getArticleById(this.parentNode.id);
            document.getElementById('back').style.visibility = 'visible';
        });
    });



}());