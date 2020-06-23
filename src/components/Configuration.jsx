import React, { Component } from 'react';
import { connect } from 'react-redux'
import { currentConfiguration, saveCurrentConfiguration } from '../store/owlh/actions'

class Configuration extends Component {
    constructor(props) {
        super()
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.state = {
            master: props.master,
            port: props.port
        }

    }

    componentDidMount() {
        this.props.loadConfig()
    }

    handleSubmit(e){
        e.preventDefault()
        this.props.saveConfig({
            master: this.state.master, 
            port: this.state.port
        })
        this.props.loadConfig()
    }

    handleChange(e){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="master"> current master - {this.props.master} -> Change -> </label>
                        <input type="text" id="master" name="master" value={this.state.master} onChange={this.handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="port"> current port - {this.props.port} -> Change -> </label>
                        <input type="text" id="port" name="port" value={this.state.port} onChange={this.handleChange}/>
                    </div>
                    <div>
                        <button type="submit">Save</button>
                        <button type="submit">Cancel</button>
                        <button type="button" onClick={this.props.loadConfig}>Reload</button>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        master: state.owlhReducer.master,
        port: state.owlhReducer.port
    }
}

const mapDispatchToProps = dispatch => {
    const loadConfig1 = () => {return currentConfiguration()}
    const saveConfig = (data) => {return saveCurrentConfiguration(data)}

  return {
    loadConfig: () => dispatch(loadConfig1()),
    saveConfig: (data) => dispatch(saveConfig(data))
  }
}

const withProps = connect(mapStateToProps, mapDispatchToProps);
export default withProps(Configuration)

