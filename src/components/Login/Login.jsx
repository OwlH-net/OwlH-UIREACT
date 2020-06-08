import React, { Component } from 'react';
import axios from 'axios';
import { userLogin, currentConfiguration } from '../../store/owlh/actions'

export default class Login extends Component {
    constructor(props) {
        super();
        this.state = {
            user: "",
            pass: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.Login = this.Login.bind(this)
    }

    handleSubmit(e) {
        event.preventDefault()
        const data = {
            usr: this.state.user,
            pass: this.state.pass
        }
        console.log("Sending data")
        userLogin(data)
    }

    handleChange(e) {
        console.log("change")
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    Login(){

    }

    render() {
        return (
            <div className="backgroundLogin container text-center p-5">
                {/* <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="user">User -> </label>
                        <input type="text" id="user" name="user" value={this.state.user} onChange={this.handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="pass">Pass -> </label>
                        <input type="password" id="pass" name="pass" value={this.state.pass} onChange={this.handleChange}/>
                    </div>
                    <button type="submit">Login</button>
                </form> */}
                <div className="d-inline-block w-75 my-5 p-5 bg-white rounded shadow-sm">
                    <h3 className=" pb-2 mb-0"><b>OwlH Login</b></h3>
                    <div className="media text-muted pt-3">
                        <div className="input-group mb-3">
                            <span className="input-group-text">Username</span>
                            <input type="text" id="owlh-input-user" className="form-control" />
                        </div>
                    </div>
                    <div className="media text-muted pt-3">                      
                        <div className="input-group">
                            <span className="input-group-text">Password</span>
                            <input type="password" id="owlh-input-psswd" className="form-control" />
                        </div>
                    </div>
                    <div className="hide" id="default-user-credentials" >
                        <p>WARNING If this is your first login, remember default credentials are admin/admin</p>
                        <p className="red-text">Please, change default credentials as soon as possible</p>
                    </div>
                </div>
                <button onClick={this.Login} type="button" className="mt-3 pt-3 w-50 btn btn-primary" id="btn-login"><h5>Login</h5></button>
                <br />
                {/* <a id="check-status-login" className="btn btn-success float-center mt-3 text-white" style="display:none;" onclick="checkStatus()" target="_blank">Check Master API connection</a> */}

            </div>
        );
    }
}
