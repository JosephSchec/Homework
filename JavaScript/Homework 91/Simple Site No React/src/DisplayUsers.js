import { getData } from "./index.js";
import getByUserId from './DisplayBlogs.js';

(async function display() {
    const center = document.getElementById('center');
    /*all users and display */
    const users = await getData('users');
    const usersArr = users.map(user => ({ id: user.id, name: user.name, website: user.website, companyInfo: user.company }));
    console.log(usersArr);

    const allUsersDisplay = document.createElement('div');
    allUsersDisplay.id = 'allUsersDisplay';
    allUsersDisplay.innerHTML = "<span>Ours Users:</span>"
    center.appendChild(allUsersDisplay);

    usersArr.forEach(user => {
        const userDisplay = document.createElement('div');
        userDisplay.id = user.name;
        userDisplay.className = 'user';
        userDisplay.innerHTML = `<div id="userDetails">
                                <h2>${user.name}</h2>
                                Visit Site <a href="${user.website}">Here</a>
                                <h4>Company : ${user.companyInfo.name}</h4>
                                <button class="findUserPost">Find All My Posts</button>
                               </div>`


        allUsersDisplay.appendChild(userDisplay);
    });

    const userPosts = document.getElementsByClassName('findUserPost');
    
    [...userPosts].forEach(button => {
        button.addEventListener('click', function () {
            const getThisUser = this.parentNode.parentNode.id;
            getByUserId(usersArr.find(user => user.name === getThisUser).id);
            document.getElementById('back').style.visibility='visible';
        });
    });

}());