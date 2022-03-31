import React from 'react'

export default function Logout({ username, setUsername }) {
  const logout = async () => {
    try {
      const response = await fetch('http://localhost:8080/authentication/logout', { credentials: 'include',
    });
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      setUsername();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>You are logged in as {username} <button onClick={logout}>logout</button></div>
  )
}