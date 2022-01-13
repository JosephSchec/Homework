import React, { useState } from 'react'
import ListComponent from './ListComponent';


export default function RecipeDetails(props) {
    const [showPic, setShowPic] = useState(true);

    const togglePic = () => {
        setShowPic(!showPic)
    }

    const { name, ingredients, directions, picture } = props.recipe;

    return (
        <>
            <h2>{name}</h2>
            {showPic && <img className='img-thumbnail w-25' src={picture} alt={name} />}
            <br />
            <button className='btn btn-secondary mt-1' onClick={togglePic}>{showPic ? 'hide' : 'show'}</button>
            <ListComponent title="ingredients" items={ingredients} />
            <ListComponent title="directions" items={directions} />
        </>
    )

}


