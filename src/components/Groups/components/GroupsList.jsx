import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import ModalWindow from '../../Shared/ModalWindow'
import { ToggleProgressBar, ToggleModalWindow, ModalButtonClicked } from '../../../store/webUtilities/actions'
import { DeleteGroup, ShowGroupForm, SaveGroupSelected, ShowEditForm, GroupToDetails, CloseGroupForm } from '../../../store/groups/actions'
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import { Route, Link, BrowserRouter, NavLink } from 'react-router-dom';

const GroupsList = (props) => {
    const [allGroups, setAllGroups] = useState([])
    const [groupSelected, setGroupSelected] = useState('')

    //getAllNodes
    useEffect(() => {
        props.toggleProgressBar(false);
        setAllGroups(props.allGroupList)
    }, [props.allGroupList])

    //Set current node uuid
    const deleteGroup = (id) => {
        setGroupSelected(id)
        props.toggleModal(true)
    }

    useEffect(() => {
        if(props.modalActionSelected.status){
            //call delete node and get all nodes at axios
            props.deleteGroup(groupSelected)
            //setState for delete node uuid selected
            setGroupSelected('')
        }
        //disable modal action
        props.modalButtonClicked({status:false, id:props.modalActionSelected.id})
    }, [props.modalActionSelected.status]);

    const showEditGroup = (val) => {
        props.showGroupForm()
        props.showEditForm()
        props.saveGroupSelected(val)
    }

    const loadDetails = (val) => {
        props.saveGroupSelected(val)        
    }

    const groupsData = () => {
        const totalList = Object.entries(allGroups || {}).map(([id , val]) =>
        {
            return (
                <tr key={id}>
                    <td key={id+'-name'}>
                        <p>{val.gname}</p>
                    </td>
                    <td key={id+'-status'}>
                        <p>{val.gdesc}</p>
                    </td>
                    <td key={id+'-actions'}>
                        <div>
                            <FaEdit size={21} className="iconBlue" onClick={() => {showEditGroup(val)}}/> &nbsp;
                            <NavLink to="GroupDetails"  onClick={() => {props.groupToDetails(val)}}><FaEye size={21} className="iconBlue" onClick={() => {loadDetails(val)}}/></NavLink>&nbsp;
                            <FaTrashAlt size={21} className="iconRed" onClick={() => {props.closeGroupForm(); deleteGroup(val.guuid)}}/>
                        </div>
                    </td>
                </tr>
            )
        })
        return totalList
    }

    return (
        <div>
            {/* modal window */}
            <ModalWindow title='Delete group' subtitle='Are you sure you want to delete this group?'
                variantColor='danger' btn='Delete' id='deleteGroup' />            

            {Object.keys(props.allGroupList || []).length <= 0
                ?
                    <div></div>
                :
                <div>
                    <table className="table table-hover table-layout-fixed">
                        <thead>
                            <tr>
                                <th>Group name</th>
                                <th>Description</th>
                                <th width="15%">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {groupsData()}
                        </tbody>
                    </table>
                </div>
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        allGroupList: state.groups.allGroupList,
        groupToEdit: state.groups.groupToEdit,
        modalActionSelected: state.webUtilities.modalActionSelected,
    }
}
const mapDispatchToProps = (dispatch) => ({
    toggleProgressBar: (status) => dispatch(ToggleProgressBar(status)),
    deleteGroup: (group) => dispatch(DeleteGroup(group)),
    toggleModal: (status) => dispatch(ToggleModalWindow(status)),
    showGroupForm: () => dispatch(ShowGroupForm()),
    saveGroupSelected: (group) => dispatch(SaveGroupSelected(group)),
    modalButtonClicked: (option) => dispatch(ModalButtonClicked(option)),
    showEditForm: () => dispatch(ShowEditForm()),
    groupToDetails: (group) => dispatch(GroupToDetails(group)),
    closeGroupForm: () => dispatch(CloseGroupForm()),
})

const withProps = connect(mapStateToProps, mapDispatchToProps);
export default withProps(GroupsList)