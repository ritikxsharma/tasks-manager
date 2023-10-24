import '../styles/pages/_login_register.scss'
import Spinner from '../components/Loading/Spinner'
import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const handleSubmit = async(e) =>{
        e.preventDefault()
        setIsLoading(true)
        setError('')
        try{
            const res = await fetch(`http://localhost:5000/api/auth/login`,{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password})
            })

            if(res.ok){
                const data = await res.json()
                setTimeout(()=>{
                    setIsLoading(false)
                    dispatch(
                        {
                            type: 'LOGIN_SUCCESS',
                            payload: {
                                user: data.user,
                                token: data.token
                            }
                        }
                    )
                    navigate('/dashboard')
                },2000)
            }
            else{
                const data = await res.json()
                setError(data.error.message)
                setIsLoading(false)
            }
        }catch(error){
            setIsLoading(false)
            console.log(`Error: ${error}`);
        }
    }

  return (
    <div className='login-page'>
        <div className="login-container">
            <h2>Welcome Back,</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input 
                        type="email"
                        id='email'
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder=' '
                        required
                    />
                    <label htmlFor="email"> Email</label>
                </div>
                <div className="form-group">
                    <input 
                        type="password"
                        id='password'
                        name='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder=' '
                        required
                    />
                    <label htmlFor="password">Password</label>
                </div>
                {
                    error !== '' && (
                        <div className="error">
                            {
                                error
                            }
                        </div>
                    )
                }
                <button type='submit'>
                    {
                        isLoading ? (
                            <Spinner></Spinner>
                        ) : (
                            'Login'
                        )
                    }
                </button>
                <div className="new-user">
                    <p>New User?</p><a href="/register">Register here</a>
                </div>
                <div className="demo-account">
                    <p>Demo Account</p>
                    <p>email: admin@gmail.com</p>
                    <p>password: admin</p>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login