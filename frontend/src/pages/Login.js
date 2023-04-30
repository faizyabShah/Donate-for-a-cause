import { useState } from 'react'
import { useUserContext } from '../hooks/userContextHook'
import { login } from '../actions/user'
import { useNavigate } from 'react-router-dom'



function Login() {

    let [formData, setFormData] = useState({
        username: '',
        password: ''
    })

    const { dispatch } = useUserContext()

    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault()
        login(formData, dispatch)


        setFormData({
            username: '',
            password: ''
        })

        
        navigate('/') 
    }

  return (
    <div className="login">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username: </label>
            <input type="text" id="username" name="username" value={formData.username} onChange={(e) => setFormData({...formData, username: e.target.value})} />
            <label htmlFor="password">Password: </label>
            <input type="password" id="password" name="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
            <button type="submit">Login</button>
        </form>
    </div>
  )
}

export default Login