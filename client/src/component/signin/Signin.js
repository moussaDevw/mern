import React,{useState} from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import {authenticate, isAuth} from '../helpers/helper'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const Signin = ()=>{
    const [user, setUser] = useState({
        email:"",
        password:"",
        buttonSub:"soumettre"
    })
    const {email,password,buttonSub} = user
    const handleInput = e =>{
        const {name,value} = e.target
        setUser({...user,[name]:value})
    }
    const handleSubmit = e =>{
        e.preventDefault()
        setUser({...user,buttonSub:'Soumission'})
        axios({
            method:'POST',
            url:'http://localhost:3001/signin',
            data:{email,password}
        }).then((response)=>{
            authenticate((response),()=>{
                setUser({...user,email:"",password:"",buttonSub:"soumettre"})
            })
        }).catch(error=>{
            toast.error(error.response.data.error)
        })
    }
    return(
        <div className="container">
            <ToastContainer />
                {isAuth() ? <Redirect to="/" /> : null}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>E-mail</label>
                    <input type="email" name="email" value={email} onChange={handleInput} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" value={password} onChange={handleInput} />
                </div>
                <div>
                    <button className="btn btn-primary">{buttonSub}</button>
                </div>
            </form>
        </div>
    )
}