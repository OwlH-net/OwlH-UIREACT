import React, { Component } from 'react'
import { Route, Link, BrowserRouter, NavLink } from 'react-router-dom';
import Master from './Master'
import { currentConfiguration } from '../../store/owlh/actions';
import { connect } from 'react-redux';

class MasterList extends Component {
    constructor(props) {
        super();
    }

    componentDidMount(){
        //Background color
        this.props.loadMasters()
    }

    render() {
        const items = (this.props.masterList || []).map(item =>{
                return <Master key={item.name} {...item} />           
            }   
        );      

        return (
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
                        { items }
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        masterList: state.owlhReducer.masterList
    }
}

const mapDispatchToProps = dispatch => {
    const loadMasters = () => {return currentConfiguration()}
    return {
        loadMasters: () => dispatch(loadMasters())
    }
}

const withProps = connect(mapStateToProps, mapDispatchToProps);
export default withProps(MasterList)
