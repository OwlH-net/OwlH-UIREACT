import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import ModalWindow from '../../Shared/ModalWindow'
import { ToggleProgressBar, ToggleModalWindow, ModalButtonClicked } from '../../../store/webUtilities/actions'
import { DeleteGroup, ToggleGroupForm, SaveGroupSelected } from '../../../store/groups/actions'
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";

const GroupsList = (props) => {
    const [allGroups, setAllGroups] = useState([])
    const [groupSelected, setGroupSelected] = useState('')
    const [groupEdited, setGroupEdited] = useState([])

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
        props.toggleGroupForm()
        props.saveGroupSelected(val)
    }

    const editGroup = (guuid) => {
        console.log(groupEdited)
        // setGroupEdited([])
        // let data = {
        //     uuid:guuid,
        //     name:gname,
        //     desc:gdesc
        // }
        // props.editGroup(data)
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
                        <span>
                            <FaEdit size={21} className="iconBlue" onClick={() => {showEditGroup(val)}}/> &nbsp;
                            <FaEye size={21} className="iconBlue"/> &nbsp;
                            <FaTrashAlt size={21} className="iconRed" onClick={() => {deleteGroup(val.guuid)}}/> &nbsp;
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
    toggleGroupForm: () => dispatch(ToggleGroupForm()),
    saveGroupSelected: (group) => dispatch(SaveGroupSelected(group)),
    modalButtonClicked: (option) => dispatch(ModalButtonClicked(option)),
})

const withProps = connect(mapStateToProps, mapDispatchToProps);
export default withProps(GroupsList)