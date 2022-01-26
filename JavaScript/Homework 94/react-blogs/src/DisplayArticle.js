import { getData } from "./getData.js";

import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import DisplayComments from "./DisplayComments.js";

export default function DisplayArticle() {
    const { id } = useParams();
    const [blogData, setState] = useState(0);
    const [showComments, setshowComments] = useState(false);
    const [commentSection, setCommentSection] = useState([]);

    const onClick = (concattedAlready) => {
        if (!concattedAlready) {
            setCommentSection(commentSection.concat(<DisplayComments key={`blog${id}comments`} />));
        }
        else {
            setCommentSection([])
        }
    };

    useEffect(() => {
        (async () => {
            const thisBlogData = await getData(`posts?id=${id}`);
            setState(thisBlogData[0])
        })();
    }, [id])

    return (
        <>
            <div id='allBlogsDisplay'>
                <div id='blogArticle' className='blogDetails' style={{ 'width': '50%' }}>
                    <h3><span>Title:</span>  {blogData.title} </h3>
                    <article id='article'><span>Article:</span> {blogData.body}</article>
                    <button id="displayComments" onClick={() => {
                        setshowComments(!showComments);
                        onClick(showComments);

                    }

                    }>{showComments ? 'Hide Comments' : 'Display Comments'}</button>
                    {showComments && commentSection}

                </div>
            </div>
        </>
    )
}




