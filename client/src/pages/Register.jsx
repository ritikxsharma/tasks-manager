import React, { useState } from 'react'
import { v4 as uuidv4 } from "uuid"
import '../styles/pages/_login_register.scss'
import Spinner from '../components/Loading/Spinner'
import { useDispatch, useSelector } from 'react-redux'
import { startLoading, stopLoading } from "../redux/actions/loadingActions";
import { useNavigate } from 'react-router-dom'

const Register = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isLoading = useSelector((state) => state.loading)
    const [newUser, setNewUser] = useState({
        id: uuidv4(),
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const handleInputChange = (e) =>{
        const {
            name,
            value
        } = e.target

        setNewUser({
            ...newUser,
            [name]: value
        })
    }

    const isFormValid = newUser.password.length > 0 && newUser.password === newUser.confirmPassword;

    const handleSubmit = async(e) =>{
        e.preventDefault()
        dispatch(startLoading())
        try {
            const res = await fetch(`http://localhost:5000/api/auth/register`,{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            })

            if(res.status === 200){
                console.log(await res.json());
                navigate('/login')
            }
            else{
                console.log(await res.json());
            }
            
        } catch (error) {
            console.log(`Error: ${error}`);
        } finally{
            dispatch(stopLoading())
        }

    }

  return (
    <div className='register-page'>
        <div className="register-container">
            <h2>New Here,</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input 
                        type="text"
                        id='name'
                        name='name'
                        value={newUser.name}
                        onChange={handleInputChange}
                        placeholder=' '
                        required
                    />
                    <label htmlFor="name"> Name</label>
                </div>
                <div className="form-group">
                    <input 
                        type="email"
                        id='email'
                        name='email'
                        value={newUser.email}
                        onChange={handleInputChange}
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
                        value={newUser.password}
                        onChange={handleInputChange}
                        placeholder=' '
                        required
                    />
                    <label htmlFor="password">Password</label>
                </div>
                <div className="form-group">
                    <input 
                        type="password"
                        id='confirmPassword'
                        name='confirmPassword'
                        value={newUser.confirmPassword}
                        onChange={handleInputChange}
                        placeholder=' '
                        required
                    />
                    <label htmlFor="confirmPassword">Confirm Password</label>
                </div>
                <button type='submit' disabled={!isFormValid}>
                    {
                        isLoading ? (
                            <Spinner></Spinner>
                        ) : (
                            'Register'
                        )
                    }
                </button>
                <div className="old-user">
                    <p>Already a User?</p><a href="/login">Login</a>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Register