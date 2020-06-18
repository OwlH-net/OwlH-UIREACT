import React from 'react'
import Cookie from 'cookie-universal'
const cookies = Cookie()

export const SetToken = (token) =>  {
    console.log("INSIDE SetToken")
    console.log(token)
    cookies.set('token', token)
    window.location.href = "/Welcome";
}

export const GetToken = () => {
    const cookieRes = cookies.get('token')
    console.log("cookieRes")
    console.log(cookieRes)
    return cookieRes != "" || cookieRes != null || cookieRes != undefined ? true : false    
}

export const RemoveToken = () => {
    const cookieRes = cookies.remove('token') 
}