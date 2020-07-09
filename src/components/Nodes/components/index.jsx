import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import Menu from '../../Shared/Components/Menu/Menu'
import Banner from '../../Shared/Components/Banner/Banner'
import { getAllNodes } from '../../../store/node/actions'
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
    
    return (
        <div>
            <Menu />

            <Banner title="Nodes" subtitle="All nodes list" />
            {/* {props.progressBar ? <ProgressBar animated now={100} /> : null} */}
            <div className="m-3 p-3">
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
    getNodes: () => dispatch(getAllNodes()),
    toggleAddNodeForm: () => dispatch(ToggleAddNodeForm()),
    getAllGroups: () => dispatch(GetAllGroups()),
})

const withProps = connect(mapStateToProps, mapDispatchToProps);
export default withProps(index)