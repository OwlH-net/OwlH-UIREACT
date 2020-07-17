import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import Menu from '../../Shared/Components/Menu/Menu'
import Banner from '../../Shared/Components/Banner/Banner'
import GroupsList from './GroupsList'
import AddGroupForm from './GroupForm'
import { GetAllGroups, ToggleGroupForm } from '../../../store/groups/actions'
import { ToggleProgressBar } from '../../../store/webUtilities/actions'
import {ProgressBar} from 'react-bootstrap'
import { addDevServerEntrypoints } from 'webpack-dev-server';

const index = (props) => {

    //getAllNodes
    useEffect(() => {
        props.toggleProgressBar(true);
        props.getAllGroups();
    }, [])

    return (
        <div>
            <Menu />   
            <Banner title="Groups" subtitle="all groups list" />  
            {props.progressBar ? <ProgressBar animated now={100} /> : null}

            <div className="m-3 p-3">              
                <a className="btn btn-primary float-right text-decoration-none text-white right" onClick={() => {props.toggleGroupForm()}}>Add new group</a>                
            </div>
            <div className="m-3 p-3">
                <GroupsList />
            </div>
            <div className="m-3 p-3">
                <a className="btn btn-primary float-right text-decoration-none text-white right" onClick={() => {props.toggleGroupForm()}}>Add new group</a>
            </div>
            <div className="m-3 p-3">
                {props.addGroupForm ? <AddGroupForm /> : null}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isEdit: state.groups.isEdit,
        addGroupForm: state.groups.addGroupForm,
        progressBar: state.webUtilities.progressBar,
    }
}
const mapDispatchToProps = (dispatch) => ({    
    toggleProgressBar: (status) => dispatch(ToggleProgressBar(status)),
    toggleGroupForm: () => dispatch(ToggleGroupForm()),
    getAllGroups: () => dispatch(GetAllGroups()),
})

const withProps = connect(mapStateToProps, mapDispatchToProps);
export default withProps(index)