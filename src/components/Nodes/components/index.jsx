import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import Menu from '../../Shared/Components/Menu/Menu'
import Banner from '../../Shared/Components/Banner/Banner'
import Footer from '../../Shared/Footer'
import { ToggleAddNodeForm, GetAllNodes, GetAllTags, ShowNodes, SortTableIP, SortTableName, SetSearchBar } from '../../../store/node/actions'
import { ToggleProgressBar } from '../../../store/webUtilities/actions'
import { GetAllGroups } from '../../../store/groups/actions'
import NodesList from './NodesList'
import AddNodeForm from './AddNodeForm'
import {ProgressBar} from 'react-bootstrap'
import AlertDialog from '../../Shared/AlertDialog'


const index = (props) => {
    //getAllNodes

    useEffect(() => {
        props.toggleProgressBar(true);
        props.getNodes()
        props.getAllGroups();
        props.getAllTags();
    }, [])
    
    const searchHandleChange = (e) => {
        props.setSearchBar(event.target.value)
    }

    //Call alert list for every map item
    const alertItems = (props.alertList || []).map(alert => {
        return <AlertDialog key={alert.id} id={alert.id} title={alert.title} subtitle={alert.subtitle} variant={alert.variant}/>
    })

    return (
        <div>
            <Menu />

            {/* Alert dialog */}
            {alertItems}

            <Banner title="Nodes" subtitle="All nodes list" />
            {props.progressBar ? <ProgressBar animated now={100} /> : null}
            <div className="p-3">
                <span onClick={() => {props.showNodes('online')}} className="badge bg-success align-text-bottom text-white float-right pointer" title="Show only online nodes">ON LINE</span>
                <span onClick={() => {props.showNodes('offline')}} className="badge bg-danger align-text-bottom text-white float-right mr-1 pointer" title="Show only offline nodes">OFF LINE</span>
                <span onClick={() => {props.showNodes('all')}} className="badge bg-primary align-text-bottom text-white float-right mr-1 pointer" title="Show all nodes">ALL NODES</span>
                <span onClick={() => {props.sortTableIP()}} className="sort-table asc badge bg-secondary align-text-bottom text-white float-left mr-1 pointer" title="Sort table by IP">Sort by IP</span>
                <span onClick={() => {props.sortTableName()}} className="sort-table badge bg-secondary align-text-bottom text-white float-left mr-1 pointer" title="Sort table by Name">Sort by Name</span>
            </div>
            <div className="input-group mt-3 container">
                <input className="form-control" type="text" placeholder="Search by name or ip..." aria-label="Search" id="search-node-details" onChange={searchHandleChange}/>
                {
                    props.addNodeForm ?
                    <a className="btn btn-primary float-right text-decoration-none text-white" onClick={() => {props.toggleAddNodeForm()}}>Close add NIDS</a>:
                    <a className="btn btn-primary float-right text-decoration-none text-white" onClick={() => {props.toggleAddNodeForm()}}>Add NIDS Node</a>
                }
            </div>
            <div className="m-3 p-3">
                <NodesList />
            </div>
            <div className="container">
                {
                    props.addNodeForm ?
                    <a className="btn btn-primary float-right text-decoration-none text-white" onClick={() => {props.toggleAddNodeForm()}}>Close add NIDS</a>:
                    <a className="btn btn-primary float-right text-decoration-none text-white" onClick={() => {props.toggleAddNodeForm()}}>Add NIDS Node</a>
                }
            </div>
            <div className="m-3 p-3">
                {props.addNodeForm ? <AddNodeForm /> : null}
            </div>
            <Footer />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        allNodesList: state.node.allNodesList,
        progressBar: state.webUtilities.progressBar,
        alertList: state.webUtilities.alertList,
        addNodeForm: state.node.addNodeForm,
        allGroupList: state.groups.allGroupList,
        
    }
}
const mapDispatchToProps = (dispatch) => ({    
    sortTableIP: () => dispatch(SortTableIP()),
    sortTableName: () => dispatch(SortTableName()),
    getNodes: () => dispatch(GetAllNodes()),
    getAllTags: () => dispatch(GetAllTags()),
    toggleAddNodeForm: () => dispatch(ToggleAddNodeForm()),
    toggleProgressBar: (status) => dispatch(ToggleProgressBar(status)),
    getAllGroups: () => dispatch(GetAllGroups()),
    showNodes: (status) => dispatch(ShowNodes(status)),
    setSearchBar: (values) => dispatch(SetSearchBar(values)),
})

const withProps = connect(mapStateToProps, mapDispatchToProps);
export default withProps(index)