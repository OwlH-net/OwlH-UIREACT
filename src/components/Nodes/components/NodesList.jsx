import React, { useState, useEffect } from 'react'
import { FaBoxOpen, FaCogs, FaTrashAlt } from "react-icons/fa";
import NodeStatus from './NodeStatus'
import { PingNode } from '../../../store/node/actions'
import { connect } from 'react-redux';

const NodesList = (props) => {
    //get node status
    useEffect(() => {
        // var nodeUUIDS = [];
        Object.entries(props.allNodesList).map(([id , val]) =>        
            props.getPingNode(id)
        )
    }, [props.allNodesList]);

    
    const nodesData = Object.entries(props.allNodesList).map(([id , val]) =>
        {
            const nodeStatus = props.nodeStatus.filter(item => item.id == id);
            return (
                <tr key={id}>
                    <td key={id+'-name'}>
                        <span>
                            {props.allNodesList[id]["name"]}<br/>
                            <p className="text-muted">{props.allNodesList[id]["ip"]}</p>
                        </span>
                    </td>
                    <td key={id+'-ip'}>
                        <NodeStatus key={id+'-node'} {...nodeStatus[0]} token={val.token}/>        
                    </td>
                    <td key={id+'-port'}>
                        <span>
                            <FaBoxOpen size={21} className="iconBlue"/> Manage node <br/>
                            <hr style={{ color: "dodgerblue", backgroundColor: "dodgerblue", height: 1}}/>
                            <FaCogs size={21} className="iconBlue" /> Modify node<br/>
                            <FaTrashAlt size={21} className="iconRed"/> Delete node <br/>
                        </span>
                    </td>
                </tr>
            )
        }
    )

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
                    {nodesData}
                </tbody>
            </table>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        nodeStatus: state.node.nodeStatus,
    }
}
const mapDispatchToProps = (dispatch) => ({
    getPingNode: (node) => dispatch(PingNode(node))

})

const withProps = connect(mapStateToProps, mapDispatchToProps);
export default withProps(NodesList)