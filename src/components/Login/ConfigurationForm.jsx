import React, { Component } from 'react'
import { Route, Link, BrowserRouter, NavLink } from 'react-router-dom';
import MasterList from './MasterList'
import NewMaster from './NewMaster'

export default class ConfigurationForm extends Component {

    componentDidMount(){
        //Background color
        document.body.style = 'background: GhostWhite;';
    }

    render() {
        return (
            <div className="backgroundLogin container text-center p-5">
                <MasterList />
                <NewMaster />
                <div>
                    <NavLink to="/" type="button" className="mt-3 mr-auto mx-3 px-2 w-25 btn float-right btn-primary"><h5>Done</h5></NavLink>
                </div>
            </div>
        )
    }
}
