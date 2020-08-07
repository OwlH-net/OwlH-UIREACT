import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { FaFile } from "react-icons/fa";
import { ChangeSuricataStatus, ShowPathInput, HidePathInput, ChangeSuricataConfigGroupPaths } from '../../../../store/groups/actions'
import { GetRulesetList, ToggleMasterFiles } from '../../../../store/groups/actions'
import { ToggleProgressBar, SaveFileDataToDisplay } from '../../../../store/webUtilities/actions'
import { Route, Link, BrowserRouter, NavLink } from 'react-router-dom';

const SuricataMasterFilesList = (props) => {

    useEffect(() => {
        {props.showMasterFiles ? props.toggleMasterFiles():null}        
    }, [])

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
                        <td><NavLink to="FileContent" onClick={() => {props.saveFileDataToDisplay(props.allGroupList[0].mastersuricata + node.masterPath, 'group')}}> <FaFile title="display file content" size={21} className="iconBlue"/> </NavLink> {node.masterPath}  </td>
                        <td>{node.masterMD5}</td>
                    </tr>
                }
            })
        });
    }

    return (
        <div>
            {
                props.showMasterFiles
                ?
                <div>
                    <h5 className="mt-3">Master files</h5>
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
                </div>
                :
                null    
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        showMasterFiles: state.groups.showMasterFiles,
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
    toggleMasterFiles: (group) => dispatch(ToggleMasterFiles(group)),    
    saveFileDataToDisplay: (file, desc) => dispatch(SaveFileDataToDisplay(file, desc)),    
})

const withProps = connect(mapStateToProps, mapDispatchToProps);
export default withProps(SuricataMasterFilesList)