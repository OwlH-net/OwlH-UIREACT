import React from 'react'
import Cookie from 'cookie-universal'

const cookies = Cookie()

export const SetToken = (token) =>  {
    cookies.set('token', token)
    window.location.href = "/";
}

export const CheckToken = () => {
    const cookieRes = cookies.get('token')   
    {
        (cookieRes == "" || cookieRes == null || cookieRes == undefined) ? 
        RemoveToken() : 
        true
    }
}

export const GetUserName = () => { 
    let currentToken = cookies.get('token')
    let splittedToken = currentToken.split('.');
    //Check token length
    { splittedToken.length != 3 ? RemoveToken() : null }
    let payload = JSON.parse(atob(splittedToken[1]));

    return payload.user
}

export const GetToken = () => { 
    return cookies.get('token')
}

export const RemoveToken = () => {    
    const cookieRes = cookies.remove('token') 
    window.location.href = "/Login"
}