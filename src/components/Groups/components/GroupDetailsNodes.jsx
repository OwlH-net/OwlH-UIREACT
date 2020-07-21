import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { FaTrashAlt } from "react-icons/fa";
import { ShowNodesGroupForm, DeleteGroupNode } from '../../../store/groups/actions'
import { ToggleProgressBar } from '../../../store/webUtilities/actions'
import AddNodeToGroup from './AddNodeToGroup'

const GroupDetailsNodes = (props) => {

    useEffect(() => {
        nodesForThisGroup(props.groupToDetails.guuid)
    }, [props.allGroupList])

    const getAllNodesGroup = (guuid) => {
        props.showNodesGroupForm(guuid)
    }
      
    const nodesForThisGroup = (guuid) => {        
        const totalList = Object.entries(props.allGroupList || {}).map(([id , val]) =>{
            if(val.guuid == guuid){
                return Object.entries(val.Nodes || {}).map(([nodesId , nodes]) =>{
                    return <tr key={nodesId}>
                        <td>{nodes.nname}</td>
                        <td>{nodes.nip}</td>
                        <td> <FaTrashAlt size={21} className="iconRed" onClick={() => {props.toggleProgressBar(true); props.deleteGroupNode(nodes.dbuuid)}}/></td>
                    </tr>
                })
            }
        });
        return totalList
    }

    return (
        <div>
            <div>
                <a className="btn btn-primary float-right text-decoration-none text-white right m-1" onClick={() => {getAllNodesGroup(props.groupToDetails.guuid)}}>Add node</a>
                {/* <a className="btn btn-success float-right text-decoration-none text-white right m-1" onClick={() => {}}>Sync all</a> */}
            </div>
            
            <div>
                <table className="table table-hover table-layout-fixed">
                    <thead>
                        <tr>
                            <th>Node name</th>
                            <th>Node IP</th>
                            <th width="15%">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {nodesForThisGroup(props.groupToDetails.guuid)}
                    </tbody>
                </table>
            </div>
            <div>
                {
                    props.isAddNodesToGroup
                    ?
                    <AddNodeToGroup/>
                    :
                    null
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        progressBar: state.webUtilities.progressBar,
        groupToDetails: state.groups.groupToDetails,
        allGroupList: state.groups.allGroupList,
        groupNodes: state.groups.groupNodes,
        isAddNodesToGroup: state.groups.isAddNodesToGroup,
    }
}
const mapDispatchToProps = (dispatch) => ({
    toggleProgressBar: (status) => dispatch(ToggleProgressBar(status)),
    getAllGroups: () => dispatch(GetAllGroups()),
    showNodesGroupForm: (guuid) => dispatch(ShowNodesGroupForm(guuid)),
    hideAllNodesGroup: () => dispatch(HideAllNodesGroup()),
    deleteGroupNode: (dbuuid) => dispatch(DeleteGroupNode(dbuuid)),
})

const withProps = connect(mapStateToProps, mapDispatchToProps);
export default withProps(GroupDetailsNodes)