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
import {CheckToken, RemoveToken, GetUserName} from '../../CheckToken'

const Menu = () => {
    const styles ={
        "borderRadius": "20%",
        "border": "3px solid black",
        "height": "30px"
    }

    const [userName, setUserNmae] = useState("")
    let username = " -- ";
    useEffect(() => {
        //Check token
        CheckToken()

        //Get username
        username = GetUserName()
        setUserNmae(username)
    },[]);

    return (
        <div>
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
                        <Nav.Link><Nodes/></Nav.Link>
                        <Nav.Link><Groups/></Nav.Link>
                        <Nav.Link><OpenRules/></Nav.Link>
                        <Nav.Link><Master/></Nav.Link>
                        <Nav.Link><Config/></Nav.Link>
                    </Nav>
                    <Dropdown className="pr-3 mr-3">
                        <Dropdown.Toggle variant="dark" id="dropdown-basic">                        
                            Logued as: <b>{userName}</b>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="">Change password</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item href="" onClick={() => RemoveToken()}>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <a href="https://github.com/OwlH-net/NEWS/blob/master/README.md" className="text-justify text-white mr-4" ><b>v: 0.15</b></a>
                </Navbar.Collapse>
            </Navbar>
            <br />
            <br />
            <br />
        </div>
    )
}

export default Menu