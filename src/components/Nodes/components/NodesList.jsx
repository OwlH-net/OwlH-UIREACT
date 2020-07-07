import React, { useState, useEffect } from 'react'
import { FaBoxOpen, FaCogs, FaTrashAlt } from "react-icons/fa";
import NodeStatus from './NodeStatus'
import ModalWindow from '../../Shared/ModalWindow'
import { PingNode, SetLoading, getAllNodes,DeleteNode } from '../../../store/node/actions'
import { ToggleModalWindow, ModalButtonClicked } from '../../../store/webUtilities/actions'
import { connect } from 'react-redux';

const NodesList = (props) => {

    const [nodeSelected, setNodeSelected] = useState('')

    useEffect(() => {
        // const NodeStatusReload = setTimeout(function(){ nodeStatusReload() }, 3000)
    }, [props.allNodesList]);

    const nodeStatusReload = () => {
        Object.entries(props.allNodesList || {}).map(([id , val]) =>    
            {
                props.getPingNode(id)
            }
        )
    }
    
    useEffect(() => {
        if(props.modalActionSelected){            
            //call delete node and get all nodes at axios
            props.deleteNode(nodeSelected)
            // //call getAllNodes
            // props.getNodes()
            //setState for delete node uuid selected
            setNodeSelected('')
        }
        //disable modal action
        props.modalButtonClicked(false)
    }, [props.modalActionSelected]);

    //Set current node uuid
    const deleteCurrentNode = (id) => {
        setNodeSelected(id)
        props.toggleModal(true)  
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
                        <NodeStatus key={id+'-node'} status={nStatus} nodeUUID={id}/>        
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
        })
        return totalList
    }

    return (        
        <div>
            {/* modal window */}
            <ModalWindow title='Delete node' subtitle='Are you sure you want to delete this node?' 
                variantColor='danger' btn='Delete' id='deleteNode' />

            {Object.keys(props.allNodesList).length <= 0 
                ?
                    <div></div>
                :
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
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        allNodesList: state.node.allNodesList,
        modal: state.webUtilities.modal,
        modalActionSelected: state.webUtilities.modalActionSelected,
    }
}
const mapDispatchToProps = (dispatch) => ({
    getPingNode: (node) => dispatch(PingNode(node)),
    setLoading: (id) => dispatch(SetLoading(id)),
    deleteNode: (node) => dispatch(DeleteNode(node)),
    toggleModal: (status) => dispatch(ToggleModalWindow(status)),
    modalButtonClicked: (option) => dispatch(ModalButtonClicked(option)),
    getNodes: () => dispatch(getAllNodes())
})

const withProps = connect(mapStateToProps, mapDispatchToProps);
export default withProps(NodesList)