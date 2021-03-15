import React,{Fragment} from 'react'
import {isAuth, signout} from '../helpers/helper'
import {NavLink,useHistory} from 'react-router-dom'
export const Menu = ()=>{
    const history = useHistory()
    return(
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">Navbar</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <NavLink className="nav-link" activeClassName="current" aria-current="page" to="/">Acceuil</NavLink>
                    </li>
                    {
                        isAuth() && isAuth().role === 'admin' && (
                        <li className="nav-item">
                        <NavLink className="nav-link" activeClassName="current" aria-current="page" to="/ProfilAdmin">Profile Admin</NavLink>
                        </li>
                    ) 
                    }
                    {
                        isAuth() && isAuth().role === 'simple' && (
                            <li className="nav-item">
                            <NavLink className="nav-link" activeClassName="current" aria-current="page" to="/ProfilAdmin">Profile {isAuth().name}</NavLink>
                            </li>
                        )}
                    {
                        !isAuth() && (
                        <Fragment>
                        <li className="nav-item">
                        <NavLink className="nav-link" activeClassName="current" to="/Signin">Signin</NavLink>
                        </li>
                        <li className="nav-item">
                        <NavLink className="nav-link" activeClassName="current" to="/Signup">Signup</NavLink>
                        </li>
                        </Fragment>
                    )
                    }
                </ul>
                {
                    isAuth() && 
                    <button className="btn btn-outline-success" type="submit" onClick={()=>{
                        signout(()=>{
                            history.push('/')
                        })
                    }}>deconnexion</button>
                }
                </div>
                </div>
            </nav>
        </div>
    )
}