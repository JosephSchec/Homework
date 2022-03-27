import React from 'react'

import { io } from "socket.io-client";

export default function Logout() {
  const socket = io(`http://${window.location.hostname}:8080`);
  

  (async () => {
    try {
      const response = await fetch('http://localhost:8080/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    }
    catch (error) {
      console.log(error)
    }
    socket.emit('user', null)

 
  })();

  return (

    <div>Successfully Logged out</div>


  )
}
