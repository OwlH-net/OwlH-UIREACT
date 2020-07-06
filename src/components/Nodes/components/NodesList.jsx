import React, { useState, useEffect } from 'react'
import { FaBoxOpen, FaCogs, FaTrashAlt } from "react-icons/fa";
import NodeStatus from './NodeStatus'
import { PingNode, SetLoading, DeleteNode } from '../../../store/node/actions'
import { connect } from 'react-redux';

const NodesList = (props) => {

    useEffect(() => {
        const NodeStatusReload = setTimeout(function(){ nodeStatusReload() }, 3000)
    }, [props.allNodesList]);

    const nodeStatusReload = () => {
        Object.entries(props.allNodesList || {}).map(([id , val]) =>    
            {
                props.getPingNode(id)
            }
        )
    }

    
    const nodesData = () => {
        const totalList = Object.entries(props.allNodesList || {}).map(([id , val]) =>
        {

            var nStatus = '';

            if(props.allNodesList[id]["token"] == "wait"){nStatus = "PENDING REGISTRATION"}
            else {nStatus = props.allNodesList[id]["status"]}

            return (
                <tr key={id}>
                    <td key={id+'-name'}>
                        <span>
                            {props.allNodesList[id]["name"]}<br/>
                            <p className="text-muted">{props.allNodesList[id]["ip"]}</p>
                        </span>
                    </td>
                    <td key={id+'-status'}>
                        <NodeStatus key={id+'-node'} status={nStatus}/>        
                        {/* <NodeStatus key={id+'-node'} {...nodeStatus[0]} token={val.token}/>         */}
                    </td>
                    <td key={id+'-actions'}>
                        <span>
                            <FaBoxOpen size={21} className="iconBlue"/> Manage node <br/>
                            <hr style={{ color: "dodgerblue", backgroundColor: "dodgerblue", height: 1}}/>
                            <FaCogs size={21} className="iconBlue" /> Modify node<br/>
                            <FaTrashAlt size={21} className="iconRed" onClick={() => {deleteCurrentNode(id)}}/> Delete node <br/>
                        </span>
                    </td>
                </tr>
            )
        }
        )
        return totalList
    }
    
    const deleteCurrentNode = (nodeUUID) => {
        props.deleteNode(nodeUUID)
    }

    return (
        <div>
            <table className="table table-hover table-layout-fixed">
                <thead>
                    <tr>
                        <th>Node name</th>
                        <th>Node status</th>
                        <th width="25%">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {nodesData()}
                </tbody>
            </table>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        allNodesList: state.node.allNodesList
    }
}
const mapDispatchToProps = (dispatch) => ({
    getPingNode: (node) => dispatch(PingNode(node)),
    setLoading: (id) => dispatch(SetLoading(id)),
    deleteNode: (node) => dispatch(DeleteNode(node))

})

const withProps = connect(mapStateToProps, mapDispatchToProps);
export default withProps(NodesList)