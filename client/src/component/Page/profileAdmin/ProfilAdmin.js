import React,{useEffect,useState} from 'react'
import {getCookie} from '../../helpers/helper'
import {ListUser} from './ListUser'
import {ModifyUser} from './ModifyUser'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
export const ProfilAdmin = ()=>{
    const [users,setUsers] = useState([{
        name:"",
        email:"",
        role:""
    }])
    const [current,setCurrent] = useState([{
        _id:null,
        name:"",
        email:"",
        role:""
    }])
    const {name,email,role} = users
    const [edit,setEdit] = useState(false)
    const editUser = (user)=>{
        setEdit(true)
        setCurrent({_id:user._id,name:user.name,email:user.email,role:user.role})
        console.log(current)
    }
    const token = getCookie('token')
    useEffect(()=>{
        axios({
            method:'GET',
            url:`http://localhost:3001/listUser`,
            headers:{
                Authorization:`Bearer ${token}`
            }
        }).then(response=>{
            setUsers(response.data)
        }).catch(error=>{
            console.log(error)
        })
    },[])
    const deleteUser = id =>{
        axios({
            method:'DELETE',
            url:`http://localhost:3001/deleteUser/${id}`,
            headers:{
                Authorization:`Bearer ${token}`
            }
        }).then((response)=>{
            setUsers(users.filter(user=>user._id !== id))
            toast.success(response.data.message)
        }).catch(error=>{
            console.log(error.response.data.error)
        })
    }
    const updateUser = (id,updatedUser)=>{
        setEdit(false)
        axios({
            method:'PUT',
            url:`http://localhost:3001/modifyUser/${id}`,
            headers:{
                Authorization:`Bearer ${token}`
            },
            data:{name,email}
        }).then(response=>{
            setUsers(users.map(user=>user._id === id ? updatedUser : user))
            toast.success(response.data.message)
        }).catch(error=>{
            toast.error(error.response.data.error)
        })
    }
    return(
        <div>
            <ToastContainer />
            {
                edit ? (
                <ModifyUser current={current} setEdit={setEdit} updateUser={updateUser} />
                ) : (
                    <ListUser users={users} deleteUser={deleteUser} editUser={editUser} />
                )
            }
        </div>
    )
}