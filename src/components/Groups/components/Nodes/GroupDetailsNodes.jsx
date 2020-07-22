import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { FaTrashAlt } from "react-icons/fa";
import { ShowNodesGroupForm, DeleteGroupNode } from '../../../../store/groups/actions'
import { ToggleProgressBar, ToggleModalWindow, ModalButtonClicked } from '../../../../store/webUtilities/actions'
import AddNodeToGroup from './AddNodeToGroup'
import ModalWindow from '../../../Shared/ModalWindow'

const GroupDetailsNodes = (props) => {
    const [nodeSelected, setNodeSelected] = useState('')

    useEffect(() => {
        nodesForThisGroup(props.groupToDetails.guuid)
    }, [props.allGroupList])

    const getAllNodesGroup = (guuid) => {
        props.showNodesGroupForm(guuid)
    }
      
    useEffect(() => {
        if(props.modalActionSelected.status){            
            props.deleteGroupNode(nodeSelected)
            setNodeSelected('')
        }
        //disable modal action
        props.modalButtonClicked({status:false, id:props.modalActionSelected.id})
    }, [props.modalActionSelected.status]);

//     const nodesForThisGroup = () => {   
//         return Object.entries(props.allGroupList[0].Nodes || {}).map(([nodesId , nodes]) =>{
//             return <tr key={nodesId}>
//                 <td>{nodes.nname}</td>
//                 <td>{nodes.nip}</td>
//                 <td> <FaTrashAlt size={21} className="iconRed" onClick={() => {deleteGroup(nodes.dbuuid)}}/></td>
//             </tr>
//        })
//    }

    const nodesForThisGroup = (guuid) => {        
        const totalList = Object.entries(props.allGroupList || {}).map(([id , val]) =>{
            if(val.guuid == guuid){
                return Object.entries(val.Nodes || {}).map(([nodesId , nodes]) =>{
                    return <tr key={nodesId}>
                        <td>{nodes.nname}</td>
                        <td>{nodes.nip}</td>
                        <td> <FaTrashAlt size={21} className="iconRed" onClick={() => {deleteGroup(nodes.dbuuid)}}/></td>
                    </tr>
                })
            }
        });
        return totalList
    }

    const deleteGroup = (dbuuid) => {
        props.toggleModal(true)
        setNodeSelected(dbuuid)
    }

    return (
        <div>
            <ModalWindow title='Delete node group' subtitle='Are you sure you want to delete this node from this group?'
                variantColor='danger' btn='Delete' id='deleteGroupNode' />

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
        modalActionSelected: state.webUtilities.modalActionSelected,
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
    toggleModal: (status) => dispatch(ToggleModalWindow(status)),
    modalButtonClicked: (option) => dispatch(ModalButtonClicked(option)),
})

const withProps = connect(mapStateToProps, mapDispatchToProps);
export default withProps(GroupDetailsNodes)