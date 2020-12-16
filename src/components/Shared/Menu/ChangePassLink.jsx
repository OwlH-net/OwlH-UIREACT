import React from 'react'
import { Route, Link, BrowserRouter, NavLink } from 'react-router-dom';

const ChangePassLink = () => {
    return (
        <NavLink to="ChangePassword" className="nav-link">Change password</NavLink>
    )
}

export default ChangePassLink