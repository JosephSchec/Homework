import { getData } from "./index.js";


export default async function showComments(id) {
    const parent = document.getElementById("allBlogsDisplay");

    const allComments = document.createElement('div');
    allComments.id = 'allComments';
    allComments.innerHTML = "<span>Comments:</span>"
    parent.appendChild(allComments);

    const comments = await getData(`comments?postId=${id}`);
    console.log(comments)
    comments.forEach(comment => {
        const commentsDisplay = document.createElement('div');
        commentsDisplay.innerHTML = `<div id="commentDetails">
                                <h3><span>Name:</span>${comment.name}</h3>
                                <h3><span>Body:</span> ${comment.body} </h3>
                               <h5><span>Email:</span>${comment.email}<h5>
                               </div>`
        allComments.appendChild(commentsDisplay);
    });
}