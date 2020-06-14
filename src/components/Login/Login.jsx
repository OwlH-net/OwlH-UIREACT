import React, { Component } from 'react';
import { userLogin, currentConfiguration } from '../../store/owlh/actions';
import { Route, Link, BrowserRouter, NavLink } from 'react-router-dom';
import Avatar from './Avatar';
import { BsGearFill } from "react-icons/bs";
import { connect } from 'react-redux'


class Login extends Component {
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

    componentDidMount() {
        console.log("currentconfig")
        console.log(this.props)
        this.props.loadConfig()
    }


    render() {
        return (            
            <div className="backgroundLogin container text-center p-5">
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
                        <NavLink to="/ConfigurationForm" type="button" className="border border-primary m-3 p-2 w-25 btn btn-light" id="btn-masters"><h5> <BsGearFill size={20} className="iconBlue"/></h5></NavLink>
                        <button type="submit" className="m-3 p-2 w-25 btn btn-primary">Login</button>
                    </div>
                </form>
            </div>
        );
    }
}


const mapDispatchToProps = dispatch => {
    console.log("dispatch to props")
    const loadConfig1 = () => {return currentConfiguration()}

  return {
    loadConfig: () => dispatch(loadConfig1()),
  }
}

const withProps = connect(null, mapDispatchToProps);
export default withProps(Login)


