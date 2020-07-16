import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import ModalWindow from '../../Shared/ModalWindow'
import {ToggleProgressBar} from '../../../store/webUtilities/actions'
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";

const GroupsList = (props) => {

    const [allGroups, setAllGroups] = useState([])

    //getAllNodes
    useEffect(() => {
        console.log(props.allGroupList)
        props.toggleProgressBar(false);
        setAllGroups(props.allGroupList)
    }, [props.allGroupList])

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
                            <FaEdit size={21} className="iconBlue"/> &nbsp;
                            <FaEye size={21} className="iconBlue"/> &nbsp;
                            <FaTrashAlt size={21} className="iconRed" onClick={() => {deleteCurrentNode(val.uuid)}}/> &nbsp;
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
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        allGroupList: state.groups.allGroupList,
    }
}
const mapDispatchToProps = (dispatch) => ({
    toggleProgressBar: (status) => dispatch(ToggleProgressBar(status)),
})

const withProps = connect(mapStateToProps, mapDispatchToProps);
export default withProps(GroupsList)