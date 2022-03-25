import React from 'react'
import useForm from '../Hooks/useForm'
import { useNavigate } from 'react-router-dom'
import '../Styles/Login.css'
export default function Login() {
    const [formData, setFormData] = useForm({ username: '', password: '' });
    const navigate = useNavigate();
    const onSubmit = async e => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/register', {
                method: 'POST',
                credentials:'include',
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
        navigate('/posts')
    }

  return (
<form id="login" onSubmit={onSubmit}>
            <label>username:
                <input name="username" value={formData.username} onChange={setFormData} />
            </label>
            <label>password:
                <input name="password" value={formData.password} onChange={setFormData}/>
            </label>
            <button>Register</button>
        </form>
  )
}
