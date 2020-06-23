import React from 'react'
import Menu from '../Shared/Components/Menu/Menu'
import Banner from '../Shared/Components/Banner/Banner'
import { Route, Link, BrowserRouter, NavLink } from 'react-router-dom';

const Welcome = () => {
    return (
        <div>
            <Menu />            
            <Banner title="Welcome" subtitle="Main menu" />
            <div className="text-center">
                <NavLink to="Nodes" type="button" className="btn btn-primary px-3 mx-2 text-white">Nodes</NavLink>
                <NavLink to="Groups" type="button" className="btn btn-primary px-3 mx-2 text-white">Groups</NavLink>
                <NavLink to="OpenRules" type="button" className="btn btn-primary px-3 mx-2 text-white">OpenRules</NavLink>
                <NavLink to="Master" type="button" className="btn btn-primary px-3 mx-2 text-white">Master</NavLink>
                <NavLink to="Config" type="button" className="btn btn-primary px-3 mx-2 text-white">Config</NavLink>
            </div>
        </div>
    )
}

export default Welcome
