import React, { useState } from 'react'
import Login from '../Components/Login'
import Logout from '../Components/Logout'

export default function Authentication({ setError }) {
  const [username, setUsername] = useState();

  const content = username ? <Logout username={username} setUsername={setUsername
  } /> : <Login setUsername={setUsername} setError={setError} />;
  return (
    <div className="authentication">
      {content}
    </div>
  )
}