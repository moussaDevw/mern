import React from 'react'
 export const ListUser = (props)=>{
     return(
         <div>
            <table class="table">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Nom</th>
                <th scope="col">Email</th>
                <th scope="col">Role</th>
                <th scope="col">Action</th>
            </tr>
            </thead>
                {
                    props.users.map((user,i)=>(
                    <tbody key={user._id} >
                <tr>
                    <th scope="row">{i+1}</th>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                        <button className="btn btn-primary" onClick={()=>props.editUser(user)}>Modifier</button>
                        <button className="btn btn-danger ml-3" onClick={()=>props.deleteUser(user._id)} >Supprimer</button>
                    </td>
                </tr>
                </tbody>
                    ))  
                }
            </table>
        </div>
     )
 }