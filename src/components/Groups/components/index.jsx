import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import Footer from '../../Shared/Footer'
import Menu from '../../Shared/Components/Menu/Menu'
import Banner from '../../Shared/Components/Banner/Banner'
import GroupsList from './GroupsList'
import AddGroupForm from './GroupForm'
import { GetAllGroups, ToggleGroupForm, ClearGroup } from '../../../store/groups/actions'
import { ToggleProgressBar } from '../../../store/webUtilities/actions'
import {ProgressBar} from 'react-bootstrap'

const index = (props) => {

    //getAllNodes
    useEffect(() => {
        props.toggleProgressBar(true);
        props.getAllGroups();
    }, [])

    const groupButton = () => {
        if(props.showGroupForm){
            return <a className="btn btn-primary float-right text-decoration-none text-white right" onClick={() => {props.clearGroup(); props.toggleGroupForm()}}>Close form</a>                
        }else{
            return <a className="btn btn-primary float-right text-decoration-none text-white right" onClick={() => {props.toggleGroupForm()}}>Add new group</a>                
        }
    }

    return (
        <div>
            <Menu />   
            <Banner title="Groups" subtitle="all groups list" />  
            {props.progressBar ? <ProgressBar animated now={100} /> : null}

            <div className="m-3 p-3">       
                {groupButton()}
            </div>
            <div className="m-3 p-3">
                <GroupsList />
            </div>
            <div className="m-3 p-3">
                {groupButton()}
            </div>
            <div className="m-3 p-3">
                {props.showGroupForm ? <AddGroupForm /> : null}
            </div>
            <Footer />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isEdit: state.groups.isEdit,
        showGroupForm: state.groups.showGroupForm,
        progressBar: state.webUtilities.progressBar,
    }
}
const mapDispatchToProps = (dispatch) => ({    
    toggleProgressBar: (status) => dispatch(ToggleProgressBar(status)),
    toggleGroupForm: () => dispatch(ToggleGroupForm()),
    getAllGroups: () => dispatch(GetAllGroups()),
    clearGroup: () => dispatch(ClearGroup()),
})

const withProps = connect(mapStateToProps, mapDispatchToProps);
export default withProps(index)