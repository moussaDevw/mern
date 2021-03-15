import React,{useState} from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import {authenticate, isAuth} from '../helpers/helper'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Signup.css'
export const Signup = ()=>{
    const [user, setUser] = useState({
        name:"",
        email:"",
        password:"",
        confirmePassword:"",
        role:"",
        buttonSub:"soumettre"
    })
    const {name,email,password,confirmePassword,role,buttonSub} = user
    const handleInput = e =>{
        const {name,value} = e.target
        setUser({...user,[name]:value})
    }
    const handleSubmit = e =>{
        e.preventDefault()
        setUser({...user,buttonSub:'Soumission'})
        axios({
            method:'POST',
            url:'http://localhost:3001/signup',
            data:{name,email,password,confirmePassword,role}
        }).then((response)=>{
                setUser({...user,name:"",email:"",password:"",confirmePassword:"",role:"",buttonSub:"soumettre"})
                toast.success(response.data.message)
        }).catch(error=>{
            toast.error(error.response.data.error)
        })
    }
    return(
        <div className="container">
            {isAuth() ? <Redirect to="/" /> : null}
            <ToastContainer />
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-controle">
                    <label>Name</label>
                    <input type="name" name="name" value={name} onChange={handleInput} />
                </div>
                <div className="form-controle">
                    <label>E-mail</label>
                    <input type="email" name="email" value={email} onChange={handleInput} />
                </div>
                <div className="form-controle">
                    <label>Password</label>
                    <input type="password" name="password" value={password} onChange={handleInput} />
                </div>
                <div className="form-controle">
                    <label>Confirme Password</label>
                    <input type="password" name="confirmePassword" value={confirmePassword} onChange={handleInput} />
                </div>
                <div className="form-controle">
                    <label>Role</label>
                    <input type="text" name="role" value={role} onChange={handleInput} />
                </div>
                <div>
                    <button className="btn btn-primary">{buttonSub}</button>
                </div>
            </form>
        </div>
    )
}