import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import ListComponent from './ListComponent';
import one from './1.json';
import two from './2.json'


export default function RecipeDetails(props) {
    const [showPic, setShowPic] = useState(true);
    const [whichJson, setWhichJson] = useState({});

    const togglePic = () => {
        setShowPic(!showPic)
    }
    const { id } = useParams();
    
    useEffect(() => {
        if (Number(id) === 1) {
            setWhichJson(one);

        } else if(Number(id)===2){
            setWhichJson(two);
        }
    }, [id])

    // fetch is returning react html template for some reason 
    /*useEffect(()=>
        (async () => {
           await fetch(`./${id}.json`)
                .then(res => res.json())
                .then(
                    (result) => {
                        console.log(result)
                    }, (error) => {
                        console.log(error)
                    })
        })() , [])*/

    const { name, ingredients, directions, picture } = whichJson;
    return (
        <>
            <h2>{whichJson.name}</h2>
            {showPic && <img className='img-thumbnail w-25' src={picture} alt={name} />}
            <br />
            <button className='btn btn-secondary mt-1' onClick={togglePic}>{showPic ? 'hide' : 'show'}</button>
            <ListComponent title="ingredients" items={ingredients} />
            <ListComponent title="directions" items={directions} />
        </>
    )

}


