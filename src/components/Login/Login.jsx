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

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="user">User -> </label>
                        <input type="text" id="user" name="user" value={this.state.user} onChange={this.handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="pass">Pass -> </label>
                        <input type="password" id="pass" name="pass" value={this.state.pass} onChange={this.handleChange}/>
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        );
    }
}
