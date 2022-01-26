import React from 'react'
import PropTypes from 'prop-types'

export default function DisplayComment(props) {
    const { comment } = props;

    return (
        <div>
            <div id="commentDetails">
                <h3><span>Name:</span>{comment.name}</h3>
                <h3><span>Body:</span> {comment.body} </h3>
                <h5><span>Email:</span>{comment.email}</h5>
            </div>
        </div>
    )
}

DisplayComment.propTypes = {
    comment: PropTypes.object.isRequired
}