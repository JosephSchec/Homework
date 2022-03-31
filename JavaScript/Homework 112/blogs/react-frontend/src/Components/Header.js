import React from 'react'
import '../Styles/Header.css';
import { NavLink } from 'react-router-dom';



export default function Header() {
  return (
    <header>
      <h1>PCS React Express Mongo Blog</h1>

      <nav>
        <NavLink to="/">home</NavLink> | <NavLink to="/addPost">add post</NavLink>
      </nav>
    </header>
  );
}