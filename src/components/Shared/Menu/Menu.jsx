import React, { useState, useEffect } from 'react';
import Nodes from './Nodes'
import Groups from './Groups'
import OpenRules from './OpenRules'
import Master from './Master'
import Config from './Config'
import { Route, Link, BrowserRouter, NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import {CheckToken, RemoveToken, GetUserName} from '../CheckToken'
import ChangePassLink from './ChangePassLink';

const Menu = () => {
    const styles ={
        "borderRadius": "20%",
        "border": "3px solid black",
        "height": "30px"
    }

    const [userName, setUserName] = useState("")
    useEffect(() => {
        //Check token
        CheckToken()

        //Get username
        let username = GetUserName()
        setUserName(username)
    },[]);

    return (
        <div className="menu-margin">
            <Navbar fixed="top" bg="dark" variant="dark" expand="xl">
                <Navbar.Brand>
                    <img className="mr-3" style={styles} src="/assets/img/AvatarOwlHOrange.png" alt="OwlH Logo" height="30" />
                    <NavLink to="/Nodes" className="navbar-brand mr-auto mr-lg-0">
                        <small>Master </small>
                        <i id="menu-title" className="text-warning">Test</i> | 
                    </NavLink>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Item><Nodes/></Nav.Item>
                        <Nav.Item><Groups/></Nav.Item>
                        <Nav.Item><OpenRules/></Nav.Item>
                        <Nav.Item><Master/></Nav.Item>
                        <Nav.Item><Config/></Nav.Item>
                    </Nav>
                    <Dropdown className="pr-3 mr-3">
                        <Dropdown.Toggle variant="dark" id="dropdown-basic">                        
                            Logued as: <b>{userName}</b>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                        {/* ChangePassword */}
                            {/* <Dropdown.Item><NavLink to="ChangePassword" currentUser={userName} className="nav-link">Change password</NavLink></Dropdown.Item> */}
                            {/* <Dropdown.Item><ChangePassLink /></Dropdown.Item> */}
                            <Dropdown.Item href="ChangePassword">Change password</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={() => RemoveToken()}>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <a href="https://github.com/OwlH-net/NEWS/blob/master/README.md" className="text-justify text-white mr-4" ><b>v: 0.15</b></a>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default Menu