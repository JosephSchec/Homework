import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

export default function DisplayUsers(props) {

    const { user } = props;

    return (<>
        <div id={user.name} className='userDetails'>
            <h2>{user.name}</h2>
            Visit Site <a href={user.website}>Here</a>
            <h4>Company : {user.companyInfo.name}</h4>
            <Link to={`/${user.name}`} >
                <button className="findUserPost"> Find All My </button>
            </Link>
        </div>
    </>
    )
}

DisplayUsers.propTypes = {
    user: PropTypes.object.isRequired,
}
