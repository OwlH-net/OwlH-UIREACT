import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import Footer from '../../Shared/Footer'
import Menu from '../../Shared/Components/Menu/Menu'
import Banner from '../../Shared/Components/Banner/Banner'
import GroupsList from './GroupsList'
import GroupForm from './GroupForm'
import { GetAllGroups, ShowGroupForm } from '../../../store/groups/actions'
import { ToggleProgressBar } from '../../../store/webUtilities/actions'
import {ProgressBar} from 'react-bootstrap'
import AlertDialog from '../../Shared/AlertDialog'

const index = (props) => {
    
    useEffect(() => {
        props.toggleProgressBar(true);
        props.getAllGroups();  
    }, [])
        
    //Call alert list for every map item
    const alertItems = (props.alertList || []).map(alert => {
        return <AlertDialog key={alert.id} id={alert.id} title={alert.title} subtitle={alert.subtitle} variant={alert.variant}/>
    })

    return (
        <div>
            <Menu />   

            {/* Alert dialog */}
            {alertItems}

            <Banner title="Groups" subtitle="all groups list" />  
            {props.progressBar ? <ProgressBar animated now={100} /> : null}

            <div className="m-3 p-3">       
                <a className="btn btn-primary float-right text-decoration-none text-white right" onClick={() => {props.showGroupForm()}}>Add new group</a>
            </div>
            <div className="m-3 p-3">
                <GroupsList />
            </div>
            <div className="m-3 p-3">
                <a className="btn btn-primary float-right text-decoration-none text-white right" onClick={() => {props.showGroupForm()}}>Add new group</a>
            </div>
            <div className="m-3 p-3">
                {props.isShowGroupForm ? <GroupForm /> : null}
            </div>
            <Footer />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        allGroupList: state.groups.allGroupList,
        isEdit: state.groups.isEdit,
        isShowGroupForm: state.groups.isShowGroupForm,
        progressBar: state.webUtilities.progressBar,
        alertList: state.webUtilities.alertList,
    }
}
const mapDispatchToProps = (dispatch) => ({    
    toggleProgressBar: (status) => dispatch(ToggleProgressBar(status)),
    showGroupForm: () => dispatch(ShowGroupForm()),
    getAllGroups: () => dispatch(GetAllGroups()),    
})

const withProps = connect(mapStateToProps, mapDispatchToProps);
export default withProps(index)