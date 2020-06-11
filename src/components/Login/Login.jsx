import React, { Component } from 'react';
import { userLogin, currentConfiguration } from '../../store/owlh/actions';
import { Route, Link, BrowserRouter, NavLink } from 'react-router-dom';
import Avatar from './Avatar';
import { BsGearFill } from "react-icons/bs";

export default class Login extends Component {
    constructor(props) {
        super();
        this.state = {
            user: "",
            pass: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleSubmit(e) {
        event.preventDefault()
        const data = {
            usr: this.state.user,
            pass: this.state.pass
        }
        console.log("Sending data")
        console.log(data)

        userLogin(data)
    }

    handleChange(e) {
        console.log("change")
        this.setState({
            [event.target.name]: event.target.value
        })
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
                <form onSubmit={this.handleSubmit}>
                    <div className="d-inline-block w-75 my-5 p-5 bg-white rounded shadow-sm">
                        <div className="mb-3">
                            <Avatar />
                        </div>
                        <h3 className=" pb-2 mb-0"><b>OwlH Login</b></h3>
                        <div className="media text-muted pt-3">
                            <div className="input-group mb-3">
                                <span className="input-group-text">Username</span>
                                <input type="text" id="user" name="user" className="form-control" value={this.state.user} onChange={this.handleChange}/>
                            </div>
                        </div>
                        <div className="media text-muted py-3 mb-3">                      
                            <div className="input-group">
                                <span className="input-group-text">Password</span>
                                <input type="password" id="pass" name="pass" className="form-control" value={this.state.pass} onChange={this.handleChange}/>
                            </div>
                        </div>
                        <div className="hide" id="default-user-credentials" >
                            <p>WARNING If this is your first login, remember default credentials are admin/admin</p>
                            <p className="red-text">Please, change default credentials as soon as possible</p>
                        </div>
                    </div>
                    <div>
                        <NavLink to="/ConfigurationForm" type="button" className="border border-primary m-3 p-3 btn btn-light" id="btn-login"><h5> <BsGearFill size={25} className="iconBlue"/></h5></NavLink>
                        <button type="submit">Login</button>
                        {/* <NavLink to="/Index" type="submit" className="m-3 p-3 w-25 btn btn-primary"><h5>Login</h5></NavLink> */}
                        {/* <button onClick={() => {}} type="button" className="m-3 p-3 w-25 btn btn-success" id="btn-login"><h5>Configuration form</h5></button>
                        <button onClick={this.Login} type="button" className="m-3 p-3 w-25 btn btn-primary" id="btn-login"><h5>Login</h5></button> */}
                    </div>
                    {/* <a id="check-status-login" className="btn btn-success float-center mt-3 text-white" style="display:none;" onclick="checkStatus()" target="_blank">Check Master API connection</a> */}
                </form>
            </div>
        );
    }
}

// const mapDispatchToProps = {
//     handleSubmit
// }

// const withProps = connect(null, mapDispatchToProps)
// export default withProps(Form)
