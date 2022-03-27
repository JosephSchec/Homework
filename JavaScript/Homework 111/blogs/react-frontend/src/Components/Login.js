import React from 'react'
import useForm from '../Hooks/useForm'
import { useNavigate } from 'react-router-dom'
import '../Styles/Login.css'
import { io } from "socket.io-client";
export default function Login() {
  const [formData, setFormData] = useForm({ username: '', password: '' });
  const socket = io(`http://${window.location.hostname}:8080`);
  const navigate = useNavigate();
  const onSubmit = async e => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    }
    catch (error) {
      console.log(error)
    }
    socket.emit('user', formData.username)
    navigate('/posts')
  }

  return (
    <form id="login" onSubmit={onSubmit}>
      <label>username:
        <input name="username" value={formData.username} onChange={setFormData} />
      </label>
      <label>password:
        <input name="password" value={formData.password} onChange={setFormData} />
      </label>
      <button>Login</button>
    </form>
  )
}
