import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { FaFile } from "react-icons/fa";
import { ChangeSuricataStatus, CheckMD5, ShowPathInput, HidePathInput, ChangeSuricataConfigGroupPaths } from '../../../../store/groups/actions'
import { GetRulesetList } from '../../../../store/groups/actions'
import { ToggleProgressBar } from '../../../../store/webUtilities/actions'

const SuricataMasterFilesList = (props) => {
    const [masterMD5, SetMasterMD5] = useState('')

    useEffect(() => {
        GetMasterMD5()
    }, [props.MD5files])

    const GetMasterMD5 = () => {
        Object.entries(props.MD5files || {}).map(([uuid , val]) =>{
            Object.entries(val || {}).map(([nodeID , node]) =>{
                SetMasterMD5(node.masterMD5)
            })
        })
    }

    return (
        <table className="table table-hover table-layout-fixed my-3">
            <thead>
                <tr>
                    <th>Master file path</th>
                    <th>Master file MD5</th>
                </tr>
            </thead>
            <tbody>
                <tr>                    
                    <td><FaFile size={21} className="iconBlue"/> path here... </td>
                    <td>{masterMD5}</td>
                </tr>
            </tbody>
        </table>
    )
}

const mapStateToProps = (state) => {
    return {
        MD5files: state.groups.MD5files,
        groupToDetails: state.groups.groupToDetails,
        allGroupList: state.groups.allGroupList,
        showSuricataConfigPath: state.groups.showSuricataConfigPath,
        rulesetList: state.groups.rulesetList,
    }
}
const mapDispatchToProps = (dispatch) => ({
    toggleProgressBar: (status) => dispatch(ToggleProgressBar(status)),
    getGroupSuricataList: (groupID) => dispatch(GetGroupSuricataList(groupID)),
    changeSuricataStatus: () => dispatch(ChangeSuricataStatus()),    
    checkMD5: (data) => dispatch(CheckMD5(data)),    
    showPathInput: () => dispatch(ShowPathInput()),    
    hidePathInput: () => dispatch(HidePathInput()),    
    changeSuricataConfigGroupPaths: (data) => dispatch(ChangeSuricataConfigGroupPaths(data)),    
    getRulesetList: (group) => dispatch(GetRulesetList(group)),    
})

const withProps = connect(mapStateToProps, mapDispatchToProps);
export default withProps(SuricataMasterFilesList)