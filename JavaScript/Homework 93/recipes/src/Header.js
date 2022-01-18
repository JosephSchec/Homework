import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Header() {
    return (<>
        <h1>Class Recipes</h1>
        <NavLink to='/'>Recipes List</NavLink> | 
        <NavLink to='/foo'>Foo</NavLink>

        <hr />
        </>
    )
}
