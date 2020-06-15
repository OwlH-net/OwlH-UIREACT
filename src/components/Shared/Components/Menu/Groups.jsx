import React from 'react'
import { Route, Link, BrowserRouter, NavLink } from 'react-router-dom';
// import GroupsIndex from '../../../Groups/components/index'

const Groups = () => {
    return (
        <NavLink to="/Groups" className="nav-link text-white">Groups</NavLink>
    )
}

export default Groups
