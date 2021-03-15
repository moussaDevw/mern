import React,{Component} from 'react'
import {isAuth} from '../helpers/helper'
import {Route, Redirect} from 'react-router-dom'
export const ProtecteAdmin = ({component:Component, ...rest})=>(
    <Route
    {...rest}
    render={props=>
    isAuth() && isAuth().role === 'admin' ? (
        <Component {...props} />
    ) : (
        <Redirect to={{
            pathname:'/Signin',
            state:{from: props.location}
        }} />
    )}></Route>
)