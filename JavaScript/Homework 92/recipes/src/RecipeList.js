import React from 'react'
import PropTypes from 'prop-types';
export default function RecipeList(props) {
    const { recipes, selectedRecipe } = props;
    return (<>
        <ul className='noBullet'>
            {recipes.map((item, index) => <li key={item.id} onClick={() => { selectedRecipe(index) }}>{item.name}</li>)}
        </ul>
    </>
    )
}

RecipeList.propTypes = {
    recipes: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired
        })
    ).isRequired,
    selectedRecipe: PropTypes.func.isRequired
}