import React, { useState, useEffect } from 'react'
import { FaBoxOpen, FaCogs, FaTrashAlt } from "react-icons/fa";
import NodeStatus from './NodeStatus'
import ModalWindow from '../../Shared/ModalWindow'
import { SetLoading, getAllNodes,DeleteNode } from '../../../store/node/actions'
import { ToggleModalWindow, ModalButtonClicked, ToggleProgressBar, ToggleEditNodeForm, NodeToEdit } from '../../../store/webUtilities/actions'
import { connect } from 'react-redux';

const NodesList = (props) => {

    const [nodeSelected, setNodeSelected] = useState('')
    const [nodesFiltered, setNodesFiltered] = useState([])

    useEffect(() => {
        console.log(props.allNodesList)
        const NodeStatusReload = setTimeout(function(){ nodeStatusReload() }, 30000)
        setNodesFiltered(props.allNodesList)
    }, [props.allNodesList]);

    useEffect(() => {
        setNodesFiltered(props.allNodesList)
    }, [props.filterByStatus]);

    useEffect(() => {
        props.getNodes()
    }, [props.sortName]);

    const nodeStatusReload = () => {
        // props.toggleProgressBar(true)
        props.getNodes()
    }
    
    useEffect(() => {
        if(props.modalActionSelected.status){            
            //call delete node and get all nodes at axios
            props.deleteNode(nodeSelected)
            //setState for delete node uuid selected
            setNodeSelected('')
        }
        //disable modal action
        props.modalButtonClicked({status:false, id:props.modalActionSelected.id})
    }, [props.modalActionSelected.status]);

    //Set current node uuid
    const deleteCurrentNode = (id) => {
        setNodeSelected(id)
        props.toggleModal(true)  
    }
    //Set current node uuid
    const modifyCurrentNode = (uuid, val) => {
        val.id = uuid;
        props.nodeToEdit(val)   
    }

    
    const nodesData = () => {   
        let nodesAfterFilter;
        let nodesAfterFilterAndSearch;
        //filter nodes by button
        if(props.filterByStatus != 'all'){
            nodesAfterFilter = (nodesFiltered || []).filter(function (key) {
                return key.status == props.filterByStatus;
            });
        }else{
            nodesAfterFilter = nodesFiltered
        }
        //filter filtered nodes by search bar
        if(props.search != '' ){
            nodesAfterFilterAndSearch = (nodesAfterFilter || []).filter(function (key) {
                return (key.name.includes(props.search) || key.ip.includes(props.search));
            });
        }else{
            nodesAfterFilterAndSearch = nodesAfterFilter
        }

        const totalList = Object.entries(nodesAfterFilterAndSearch || {}).map(([id , val]) =>
        {
            return (
                <tr key={id} uuid={val.uuid}>
                    <td key={val.uuid+'-name'}>
                        <span>
                            {val.name}<br/>
                            <p className="text-muted">{val.ip}</p>
                        </span>
                    </td>
                    <td key={val.uuid+'-status'}>
                        <NodeStatus key={val.uuid+'-node'} registrationStatus={val.token} status={val.status} nodeUUID={val.uuid}/>        
                    </td>
                    <td key={val.uuid+'-actions'}>
                        <span>
                            <FaBoxOpen size={21} className="iconBlue"/> Manage node <br/>
                            <hr style={{ color: "dodgerblue", backgroundColor: "dodgerblue", height: 1}}/>
                            <FaCogs size={21} className="iconBlue" onClick={() => {modifyCurrentNode(val.uuid, val)}}/> Modify node<br/>
                            <FaTrashAlt size={21} className="iconRed" onClick={() => {deleteCurrentNode(val.uuid)}}/> Delete node <br/>
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
        search: state.node.search,
        sortName: state.node.sortName,
        sortIP: state.node.sortIP,
        filterByStatus: state.node.filterByStatus,
        allNodesList: state.node.allNodesList,
        modal: state.webUtilities.modal,
        modalActionSelected: state.webUtilities.modalActionSelected,
    }
}
const mapDispatchToProps = (dispatch) => ({
    // getPingNode: (node) => dispatch(PingNode(node)),
    setLoading: (id) => dispatch(SetLoading(id)),
    deleteNode: (node) => dispatch(DeleteNode(node)),
    toggleModal: (status) => dispatch(ToggleModalWindow(status)),
    modalButtonClicked: (option) => dispatch(ModalButtonClicked(option)),
    getNodes: () => dispatch(getAllNodes()),
    toggleEditNodeForm: () => dispatch(ToggleEditNodeForm()),
    toggleProgressBar: (status) => dispatch(ToggleProgressBar(status)),
    nodeToEdit: (status) => dispatch(NodeToEdit(status))
})

const withProps = connect(mapStateToProps, mapDispatchToProps);
export default withProps(NodesList)