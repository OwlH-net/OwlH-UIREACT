import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import Menu from '../../Shared/Components/Menu/Menu'
import Banner from '../../Shared/Components/Banner/Banner'
import { getAllNodes, ShowNodes, SortTableIP, SortTableName, SetSearchBar } from '../../../store/node/actions'
import { ToggleAddNodeForm } from '../../../store/webUtilities/actions'
import { GetAllGroups } from '../../../store/groups/actions'
import NodesList from './NodesList'
import AddNodeForm from './AddNodeForm'
import {ProgressBar} from 'react-bootstrap'


const index = (props) => {
    //getAllNodes
    useEffect(() => {
        props.getNodes()
        props.getAllGroups();
    }, [])
    
    const searchHandleChange = (e) => {
        props.setSearchBar(event.target.value)
    }

    return (
        <div>
            <Menu />

            <Banner title="Nodes" subtitle="All nodes list" />
            {/* {props.progressBar ? <ProgressBar animated now={100} /> : null} */}
            <div className="p-3">
                <span onClick={() => {props.showNodes('online')}} className="badge bg-success align-text-bottom text-white float-right pointer" title="Show only online nodes">ON LINE</span>
                <span onClick={() => {props.showNodes('offline')}} className="badge bg-danger align-text-bottom text-white float-right mr-1 pointer" title="Show only offline nodes">OFF LINE</span>
                <span onClick={() => {props.showNodes('all')}} className="badge bg-primary align-text-bottom text-white float-right mr-1 pointer" title="Show all nodes">ALL NODES</span>
                <span onClick={() => {props.sortTableIP()}} className="sort-table asc badge bg-secondary align-text-bottom text-white float-left mr-1 pointer" title="Sort table by IP">Sort by IP</span>
                <span onClick={() => {props.sortTableName()}} className="sort-table badge bg-secondary align-text-bottom text-white float-left mr-1 pointer" title="Sort table by Name">Sort by Name</span>
            </div>
            <div className="input-group m-3">
                <input className="form-control mx-3" type="text" placeholder="Search by name or ip..." aria-label="Search" id="search-node-details" onChange={searchHandleChange}/>
                {
                    props.addNodeForm ?
                    <a className="btn btn-primary float-right text-decoration-none text-white" onClick={() => {props.toggleAddNodeForm()}}>Close add NIDS</a>:
                    <a className="btn btn-primary float-right text-decoration-none text-white" onClick={() => {props.toggleAddNodeForm()}}>Add NIDS Node</a>
                }
            </div>
            <div className="m-3 p-3">
                <NodesList />
            </div>
            <div className="m-3 p-3">
                {
                    props.addNodeForm ?
                    <a className="btn btn-primary float-right text-decoration-none text-white" onClick={() => {props.toggleAddNodeForm()}}>Close add NIDS</a>:
                    <a className="btn btn-primary float-right text-decoration-none text-white" onClick={() => {props.toggleAddNodeForm()}}>Add NIDS Node</a>
                }
            </div>
            <div className="m-3 p-3">
                {props.addNodeForm ? <AddNodeForm /> : null}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        allNodesList: state.node.allNodesList,
        progressBar: state.webUtilities.progressBar,
        addNodeForm: state.webUtilities.addNodeForm,
        allGroupList: state.groups.allGroupList,
    }
}
const mapDispatchToProps = (dispatch) => ({    
    sortTableIP: () => dispatch(SortTableIP()),
    sortTableName: () => dispatch(SortTableName()),
    getNodes: () => dispatch(getAllNodes()),
    toggleAddNodeForm: () => dispatch(ToggleAddNodeForm()),
    getAllGroups: () => dispatch(GetAllGroups()),
    showNodes: (status) => dispatch(ShowNodes(status)),
    setSearchBar: (values) => dispatch(SetSearchBar(values)),
})

const withProps = connect(mapStateToProps, mapDispatchToProps);
export default withProps(index)