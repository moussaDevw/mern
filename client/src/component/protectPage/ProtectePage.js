import React,{Component} from 'react'
import {isAuth} from '../helpers/helper'
import {Route,Redirect} from 'react-router-dom'

export const ProtectePage = ({component:Component, ...rest})=>(
    <Route
    {...rest}
    render={props=>
    isAuth() && isAuth().role === 'simple' ? (
        <Component {...props} />
    ) : (
        <Redirect to={{
            pathname:'/Signin',
            state:{from: props.location}
        }} />
    )}
    ></Route>
)