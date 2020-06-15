import React from 'react'
import { Route, Link, BrowserRouter, NavLink } from 'react-router-dom';
// import NodesIndex from '../../../Nodes/components/index'

const Nodes = () => {
    return (
        <div>
            <NavLink to="/Nodes" className="nav-link">Nodes</NavLink>
        </div>
    )
}

export default Nodes
