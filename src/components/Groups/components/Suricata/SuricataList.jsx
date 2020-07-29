import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { GetGroupSuricataList } from '../../../../store/groups/actions'
import { ToggleProgressBar } from '../../../../store/webUtilities/actions'
import { FaInfoCircle } from "react-icons/fa";

const SuricataList = (props) => {

    useEffect(() => {
        props.toggleProgressBar(false);
        props.getGroupSuricataList(props.groupToDetails.guuid);
    }, [])

    useEffect(() => {
        SuricataList()
    }, [props.SuricataGroupList])
    
    const SuricataList = () => {
        const totalList = Object.entries(props.SuricataGroupList || {}).map(([id , val]) =>{
            if(id != "installed" && id != "zeek"){
                return <tr key={id}>
                    <td>{val.nodeName}</td>
                    {
                        val.status == "enabled" 
                        ? 
                        <td><span className="badge bg-success align-text-bottom text-white">{val.status}</span></td> 
                        : 
                        <td><span className="badge bg-danger align-text-bottom text-white">{val.status}</span></td> 
                    }
                    <td>{val.interface}</td>
                    <td><FaInfoCircle size={21} className="iconBlue" /></td>
                </tr>
            }
        })
        return totalList
    }
    
    return (
        <table className="table table-hover table-layout-fixed">
            <thead>
                <tr>
                    <th>Node name</th>
                    <th>Suricata status</th>
                    <th>Suricata interface</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {SuricataList()}
            </tbody>
        </table>
    )
}

const mapStateToProps = (state) => {
    return {
        SuricataGroupList: state.groups.SuricataGroupList,
        groupToDetails: state.groups.groupToDetails,
    }
}
const mapDispatchToProps = (dispatch) => ({
    toggleProgressBar: (status) => dispatch(ToggleProgressBar(status)),
    getGroupSuricataList: (groupID) => dispatch(GetGroupSuricataList(groupID)),
    
})

const withProps = connect(mapStateToProps, mapDispatchToProps);
export default withProps(SuricataList)