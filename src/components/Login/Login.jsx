import React, { Component, useEffect } from 'react';
import { userLogin, currentConfiguration } from '../../store/owlh/actions';
import { showSpinner, defaultCredentials,AddAlertToAlertList, toggleAlert } from '../../store/webUtilities/actions';
import { Route, Link, BrowserRouter, NavLink } from 'react-router-dom';
import Avatar from './Avatar';
import { BsGearFill } from "react-icons/bs";
import { connect } from 'react-redux';
import Spinner from '../../components/Shared/Spinner'
import AlertDialog from '../../components/Shared/AlertDialog'

class Login extends Component {
    constructor(props) {
        super();
        this.state = {
            user: "",
            password: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleSubmit(e) {
        event.preventDefault()
        const data = {
            user: this.state.user,
            password: this.state.password
        }
        //display token
        this.props.displaySpinner()

        //get token from server
        this.props.userLoginToken(data)
    }

    handleChange(e) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    componentDidMount() {
        this.props.loadConfig()
        
        //load message when admin credentials are default
        this.props.checkDefaultCredentials()      
    }
    
    // checkAlerts(){
    //     console.log(props.alertList)
    //     return (props.alertList || []).map(alert => {
    //         return <AlertDialog key={alert.id} id={alert.id} title={alert.title} subtitle={alert.subtitle} variant={alert.variant}/>
    //     })
    // }

    render() {
        return (
            <div className="backgroundLogin text-center p-5">
            {/* <AlertDialog key={alert.id} id={alert.id} title={alert.title} subtitle={alert.subtitle} variant={alert.variant}/> */}
            {/* {this.checkAlerts} */}
                {/* {
                    console.log(this.props.alertList)
                } */}
                {
                    !this.props.isMasterActive 
                    ? <span id="master-offline-banner" className="badge bg-danger align-text-bottom text-white m-3 p-3"><b>Master connection error! </b>The master selected is currently unavailable</span>
                    : null
                }

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
                                <input type="password" id="password" name="password" className="form-control" value={this.state.password} onChange={this.handleChange}/>
                            </div>
                        </div>
                        {
                            this.props.defaults ? 
                            <div id="default-user-credentials" >
                                <p>WARNING If this is your first login, remember default credentials are admin/admin</p>
                                <p className="red-text">Please, change default credentials as soon as possible</p>
                            </div> : null
                        }
                    </div>
                    <div>
                        <NavLink to="/ConfigurationForm" type="button" className="border border-primary m-3 p-2 w-25 btn btn-light" id="btn-masters"><h5> <BsGearFill size={20} className="iconBlue"/></h5></NavLink>
                        {/* <NavLink to="/Welcome" type="button" className="border border-primary m-3 p-2 w-25 btn btn-primary" id="btn-masters"><h5> Login </h5></NavLink> */}
                        <button type="submit" className="m-3 p-2 w-25 btn btn-primary"><div style={{display: 'flex', justifyContent: 'center' ,alignItems: 'center'}}>Login {this.props.spinner ? <span className="mx-3"><Spinner /></span> : null}</div></button>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        alertList: state.webUtilities.alertList,
        isMasterActive: state.webUtilities.isMasterActive,
        spinner: state.webUtilities.spinner,
        defaults: state.webUtilities.defaults
    }
}

const mapDispatchToProps = dispatch => {
    const loadConfig1 = () => {return currentConfiguration()}
    const getLogin = (data) => {return userLogin(data)}
    const getSpinner = () => {return showSpinner()}
    const getDefaultCredentials = () => {return defaultCredentials()}
    const addAlert = (alert) => {return AddAlertToAlertList(alert)}
    const changeCurrentStatus = (data) => {return toggleAlert(data)}
    return {
        loadConfig: () => dispatch(loadConfig1()),
        userLoginToken: (data) => dispatch(getLogin(data)),
        displaySpinner: () => dispatch(getSpinner()),
        checkDefaultCredentials: () => dispatch(getDefaultCredentials()),
        addAlertToState: (alert) => dispatch(addAlert(alert)),
        ChangeCurrentAlertStatus: (data) => dispatch(changeCurrentStatus(data)),
    }
}

const withProps = connect(mapStateToProps, mapDispatchToProps);
export default withProps(Login)