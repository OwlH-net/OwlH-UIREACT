import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { FaFile } from "react-icons/fa";
import { ChangeSuricataStatus, ShowPathInput, HidePathInput, ChangeSuricataConfigGroupPaths } from '../../../../store/groups/actions'
import { GetRulesetList } from '../../../../store/groups/actions'
import { ToggleProgressBar } from '../../../../store/webUtilities/actions'
import { NODE_TO_EDIT } from '../../../../store/node/node-action-types';

const SuricataMasterFilesList = (props) => {

    useEffect(() => {
        GetMasterMD5()
    }, [props.MD5files])

    const GetMasterMD5 = () => {
        var paths = []
        return Object.entries(props.MD5files || {}).map(([uuid , val]) =>{
            return Object.entries(val || {}).map(([nodeID , node]) =>{
                if(!paths.includes(node.masterPath)){
                    paths.push(node.masterPath)
                    return <tr key={nodeID}>                    
                        <td><FaFile size={21} className="iconBlue"/> {node.masterPath} </td>
                        <td>{node.masterMD5}</td>
                    </tr>
                }
            })
        });
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
                {GetMasterMD5()}
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
    showPathInput: () => dispatch(ShowPathInput()),    
    hidePathInput: () => dispatch(HidePathInput()),    
    changeSuricataConfigGroupPaths: (data) => dispatch(ChangeSuricataConfigGroupPaths(data)),    
    getRulesetList: (group) => dispatch(GetRulesetList(group)),    
})

const withProps = connect(mapStateToProps, mapDispatchToProps);
export default withProps(SuricataMasterFilesList)