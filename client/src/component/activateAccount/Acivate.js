import React,{useEffect,useState} from 'react'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import {useHistory} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const Activate = ({match})=>{
    const [values,setValues] = useState({
        name:'',
        token:'',
        show:true
    })
    const history = useHistory()
    useEffect(()=>{
        let token = match.params.token
        let {name} = jwt.decode(token)
        if(token){
            setValues({...values,name,token})
        }
    },[])
    const {name,token,show} = values
    const handleSubmit = (e)=>{
        e.preventDefault()
        axios({
            method:'POST',
            url:'http://localhost:3001/activate',
            data:{token}
        }).then(response=>{
            setValues({...values,show:false})
            toast.success(response.data.message)
        }).catch(error=>{
            toast.error(error.response.data.error)
        })
    }
    return(
        <div>
            <ToastContainer />
            <p>Bonjour {name} pret a activer votre compte </p>
            <form onSubmit={handleSubmit}>
                <button className="btn btn-primary">
                    Acitver votre compte
                </button>
            </form>
        </div>
    )
}