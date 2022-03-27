import React, {  useEffect, useState } from 'react'
import '../Styles/Header.css';
import { NavLink } from 'react-router-dom';
import { io } from "socket.io-client";


const socket = io(`http://${window.location.hostname}:8080`);

export default function Header() {
  const [user, setUser] = useState(null);

  useEffect(()=>{
    socket.on('user',thisUser=>setUser(thisUser))
  })

  return (
    <header>
      <h1>Class Blog</h1>
      <nav>
        <NavLink to="/">home</NavLink> |
        <NavLink to="/addPost">add post</NavLink>
        |{user ? <NavLink to="/logout">logout {user}</NavLink> : <NavLink to="/login">login</NavLink>} |
        <NavLink to="/register">register</NavLink> 
      </nav>
    </header>
  )
}
