import React from 'react'
import useForm from '../Hooks/useForm'
import '../Styles/Login.css'

export default function Login({ setUsername, setError }) {
  const [formData, setFormData] = useForm({ username: '', password: '' });

  const login = async () => {
    try {
      const response = await fetch('http://localhost:8080/authentication/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      setUsername(formData.username);
    } catch (error) {
      //console.error(error);
      setError(error.message);
    }
  };

  const register = async () => {
    try {
      const response = await fetch('http://localhost:8080/authentication/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    } catch (error) {
      //console.error(error);
      setError(error.message);
    }
  };

  return (
    <form onSubmit={e => e.preventDefault()}>
      <input name="username" placeholder="username" required value={formData.username} onChange={setFormData}/>
      <input type="password" name="password" placeholder="password" required value={formData.password} onChange={setFormData}/>
      <button onClick={login}>login</button>
      <button onClick={register}>register</button>
    </form>
  )
}