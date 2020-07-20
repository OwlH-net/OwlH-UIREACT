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
    //reload nodes for take current node status
    useEffect(() => {
        const NodeStatusReload = setTimeout(function(){ nodeStatusReload() }, 30000)
        setNodesFiltered(props.allNodesList)
    }, [props.allNodesList]);
    //save current node list for apply filters
    useEffect(() => {
        setNodesFiltered(props.allNodesList)
    }, [props.filterByStatus]);
    //apply filtert for sort by name
    useEffect(() => {
        var sortedObj;
        {props.sortName == 'asc' ? sortedObj = props.allNodesList.sort(compareNameAsc) : sortedObj = props.allNodesList.sort(compareNameDesc)}
        setNodesFiltered(sortedObj)        
    }, [props.sortName]);    
    //apply filtert for sort by ip
    useEffect(() => {
        var sortedObj;
        {props.sortIP == 'asc' ? sortedObj = props.allNodesList.sort(compareIpAsc) : sortedObj = props.allNodesList.sort(compareIpDesc)}
        setNodesFiltered(sortedObj)
    }, [props.sortIP]);

    const nodeStatusReload = () => {
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

    function compareNameAsc(a, b) {
        if (a.name > b.name) return 1;
        if (b.name > a.name) return -1;
        return 0;
    }
    function compareNameDesc(a, b) {
        if (a.name < b.name) return 1;
        if (b.name < a.name) return -1;
        return 0;
    }
    function compareIpAsc(a, b) {
        var firstNameSplited = a.ip.split(".");
        var lastNameSplited = b.ip.split(".");

        if(parseInt(firstNameSplited[0]) > parseInt(lastNameSplited[0])){return 1}
        else if(parseInt(firstNameSplited[0]) == parseInt(lastNameSplited[0]) && parseInt(firstNameSplited[1]) > parseInt(lastNameSplited[1])){return 1}
        else if(parseInt(firstNameSplited[0]) == parseInt(lastNameSplited[0]) && (parseInt(firstNameSplited[1]) == parseInt(lastNameSplited[1])) && (parseInt(firstNameSplited[2]) > parseInt(lastNameSplited[2]))){return 1}
        else if(parseInt(firstNameSplited[0]) == parseInt(lastNameSplited[0]) && (parseInt(firstNameSplited[1]) == parseInt(lastNameSplited[1])) && (parseInt(firstNameSplited[2]) == parseInt(lastNameSplited[2])) && (parseInt(firstNameSplited[3]) > parseInt(lastNameSplited[3]))){return 1}
        else if(parseInt(firstNameSplited[0]) < parseInt(lastNameSplited[0])){return -1}
        else if(parseInt(firstNameSplited[0]) == parseInt(lastNameSplited[0]) && parseInt(firstNameSplited[1]) < parseInt(lastNameSplited[1])){return -1}
        else if(parseInt(firstNameSplited[0]) == parseInt(lastNameSplited[0]) && (parseInt(firstNameSplited[1]) == parseInt(lastNameSplited[1])) && (parseInt(firstNameSplited[2]) < parseInt(lastNameSplited[2]))){return -1}
        else if(parseInt(firstNameSplited[0]) == parseInt(lastNameSplited[0]) && (parseInt(firstNameSplited[1]) == parseInt(lastNameSplited[1])) && (parseInt(firstNameSplited[2]) == parseInt(lastNameSplited[2])) && (parseInt(firstNameSplited[3]) < parseInt(lastNameSplited[3]))){return -1}
        else{return 0}
    }
    function compareIpDesc(a, b) {
        var firstNameSplited = a.ip.split(".");
        var lastNameSplited = b.ip.split(".");

        if(parseInt(firstNameSplited[0]) < parseInt(lastNameSplited[0])){return 1}
        else if(parseInt(firstNameSplited[0]) == parseInt(lastNameSplited[0]) && parseInt(firstNameSplited[1]) < parseInt(lastNameSplited[1])){return 1}
        else if(parseInt(firstNameSplited[0]) == parseInt(lastNameSplited[0]) && (parseInt(firstNameSplited[1]) == parseInt(lastNameSplited[1])) && (parseInt(firstNameSplited[2]) < parseInt(lastNameSplited[2]))){return 1}
        else if(parseInt(firstNameSplited[0]) == parseInt(lastNameSplited[0]) && (parseInt(firstNameSplited[1]) == parseInt(lastNameSplited[1])) && (parseInt(firstNameSplited[2]) == parseInt(lastNameSplited[2])) && (parseInt(firstNameSplited[3]) < parseInt(lastNameSplited[3]))){return 1}
        else if(parseInt(firstNameSplited[0]) > parseInt(lastNameSplited[0])){return -1}
        else if(parseInt(firstNameSplited[0]) == parseInt(lastNameSplited[0]) && parseInt(firstNameSplited[1]) > parseInt(lastNameSplited[1])){return -1}
        else if(parseInt(firstNameSplited[0]) == parseInt(lastNameSplited[0]) && (parseInt(firstNameSplited[1]) == parseInt(lastNameSplited[1])) && (parseInt(firstNameSplited[2]) > parseInt(lastNameSplited[2]))){return -1}
        else if(parseInt(firstNameSplited[0]) == parseInt(lastNameSplited[0]) && (parseInt(firstNameSplited[1]) == parseInt(lastNameSplited[1])) && (parseInt(firstNameSplited[2]) == parseInt(lastNameSplited[2])) && (parseInt(firstNameSplited[3]) > parseInt(lastNameSplited[3]))){return -1}
        else{return 0}
    }

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

            {Object.keys(props.allNodesList || []).length <= 0 
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
        // modal: state.webUtilities.modal,
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