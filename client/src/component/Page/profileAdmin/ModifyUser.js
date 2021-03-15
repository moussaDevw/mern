import React,{useState} from 'react'

export const ModifyUser = (props)=>{
    const [user,setUser] = useState(props.current)
    const handleInput = e =>{
        const {name,value} = e.target
        setUser({...user,[name]:value})
    }
    const handleSubmit = e =>{
        e.preventDefault()
        props.updateUser(user._id,user)
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>name</label>
                    <input type="text" name="name" value={user.name} onChange={handleInput} />
                </div>
                <div>
                    <label>e-mail</label>
                    <input type="text" name="email" value={user.email} onChange={handleInput} />
                </div>
                <div>
                    <label>role</label>
                    <input type="text" name="role" value={user.role} onChange={handleInput} disabled />
                </div>
                <div>
                    <button className="btn btn-success">Validez</button>
                    <button className="btn btn-primary" onClick={()=>props.setEdit(false)}>cancel</button>
                </div>
            </form>
        </div>
    )
}