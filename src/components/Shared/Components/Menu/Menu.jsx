import React from 'react'
import Nodes from './Nodes'
import Groups from './Groups'
import OpenRules from './OpenRules'
import Master from './Master'
import Config from './Config'
import { Route, Link, BrowserRouter, NavLink } from 'react-router-dom';

const Menu = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
                <img className="mr-3" src="/assets/img/AvatarOwlHOrange.png" alt="" height="30" />
                <NavLink to="/Nodes" className="navbar-brand mr-auto mr-lg-0">
                    <small>Master </small>
                    <i id="menu-title" className="text-warning">Test</i> | 
                </NavLink>  
            
                <div className="navbar-collapse offcanvas-collapse" id="navbarsExampleDefault">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Nodes/>                            
                            {/* <a className="nav-link" href="nodes.html">Nodes</a> */}
                        </li>
                        <li className="nav-item">
                            <Groups/>                            
                            {/* <a className="nav-link" href="groups.html">Groups</a> */}
                        </li>
                        <li className="nav-item">
                            <OpenRules/>                            
                            {/* <a className="nav-link" href="rulesets.html">Open Rules</a> */}
                        </li>
                        <li className="nav-item">
                            <Master/>                            
                            {/* <a className="nav-link" href="master.html">Master</a> */}
                        </li>
                        <li className="nav-item">
                            <Config/>                            
                            {/* <a className="nav-link" href="config.html">Config</a> */}
                        </li>
                    </ul>

                    <div className="dropdown mr-4">
                        <button className="btn btn-dark dropdown-toggle" type="button" id="dropdownMenuUser" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><b id="loger-user-name" value="">Loged as: </b></button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuUser">
                            <a className="dropdown-item">Change Password</a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item">Logout</a>
                        </div>
                    </div>
                </div>
                <a className="text-justify align-middle text-white">v:</a><a href="https://github.com/OwlH-net/NEWS/blob/master/README.md" className="text-justify text-white mr-4" >0.15</a>
            </nav>
        </div>
    )
}

export default Menu
