import { getData } from "./getData";
import React, { useEffect, useState } from 'react'
import DisplayComment from "./DisplayComment.js";
import { useParams } from "react-router-dom";

export default function DisplayComments() {
    const { id } = useParams();
    const [commentsArr, setState] = useState([]);
    useEffect(() => {

        (async () => {
            try {
                if (!commentsArr.length) {
                    const comments = await getData(`comments?postId=${id}`);
                    setState(comments)
                }
            } catch (error) {
                console.log(error);
            }


        })();
    }, [commentsArr,id])

    const allComments = commentsArr.map(comment => <DisplayComment key={comment.id} comment={comment} />);


    return (
        <div id="allComments" >
            <span>Comments:</span>
            {allComments}
        </div>

    )
}
