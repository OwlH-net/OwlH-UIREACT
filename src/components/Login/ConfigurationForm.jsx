import React, { Component } from 'react'
import { Route, Link, BrowserRouter, NavLink } from 'react-router-dom';

import { BsX, BsCheck, BsBookmarkFill, BsTrashFill } from "react-icons/bs";

export default class ConfigurationForm extends Component {

    componentDidMount(){
        //Background color
        document.body.style = 'background: GhostWhite;';
    }

    render() {
        return (
            <div className="backgroundLogin container text-center p-5">
                <div>
                    <h4>Master List</h4>
                    <table className="table table-hover" >
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>IP</th>
                                <th>Port</th>
                                <th>Active</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>master 1</td>
                                <td>192.168.1.110</td>
                                <td>50001</td>
                                <td><BsCheck size={25} className="green-text"/></td>
                                <td className="green-text">Online</td>
                                <td><BsBookmarkFill size={25} className="iconBlue"/><BsTrashFill size={25} className="iconRed"/></td>
                            </tr>
                            <tr>
                                <td>master 2</td>
                                <td>192.168.1.111</td>
                                <td>50002</td>
                                <td></td>
                                <td className="red-text">Offline</td>
                                <td><BsBookmarkFill size={25} className="iconBlue"/><BsTrashFill size={25} className="iconRed"/></td>
                            </tr>
                        </tbody>
                    </table>
                    <br />
                    <br />
                    <br />
                    <div>
                        <h4>New Master</h4>
                        <div style={{border: '2px solid'}}>
                            <div className="media text-muted p-1 m-1">                      
                                <div className="input-group">
                                    <span className="w-25 input-group-text">Master name</span>
                                    <input type="password" className="form-control" />
                                </div>
                            </div>
                            <div className="media text-muted p-1 m-1">                      
                                <div className="input-group">
                                    <span className="w-25 input-group-text">Master IP</span>
                                    <input type="password" className="form-control" />
                                </div>
                            </div>
                            <div className="media text-muted p-1 m-1">                      
                                <div className="input-group">
                                    <span className="w-25 input-group-text">Port</span>
                                    <input type="password" className="form-control" />
                                </div>
                            </div>
                            <div className="media text-muted p-1 m-1">                      
                                <div className="input-group">
                                    <span className="w-25 input-group-text">Description</span>
                                    <input type="password" className="form-control" />
                                </div>
                            </div>
                        
                            <div className="AlignRight input-group">
                                <NavLink to="/" type="button" className="m-3 p-2 w-25 btn btn-primary"><h5>Add</h5></NavLink>
                            </div>

                        </div>
                    </div>
                    <br />
                    <div>
                        <NavLink to="/" type="button" className="mr-auto mx-3 px-2 w-25 btn float-right btn-primary"><h5>Done</h5></NavLink>
                    </div>
                </div>
            </div>
        )
    }
}
