import React from 'react'
import { Route, Link, BrowserRouter, NavLink } from 'react-router-dom';
// import NodesIndex from '../../../Nodes/components/index'

const Nodes = () => {
    return (
        <NavLink to="/Nodes" className="nav-link text-white">Nodes</NavLink>
    )
}

export default Nodes
