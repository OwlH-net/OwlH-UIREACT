import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'; 
import { FaFolderOpen } from "react-icons/fa";
import { ChangeSuricataStatus, CheckMD5, ShowPathInput, HidePathInput, ChangeSuricataConfigGroupPaths } from '../../../../store/groups/actions'
import { GetRulesetList, ToggleNodeFiles, ResetDisplaynodeFileList } from '../../../../store/groups/actions'
import { ToggleProgressBar } from '../../../../store/webUtilities/actions'

const SuricataNodes = (props) => {

    // const [masterMD5, SetMasterMD5] = useState('')
    const [suriConfigPath, SetSuriConfigPath] = useState({
        type: 'suricata',
        uuid: props.groupToDetails.guuid,
        mastersuricata: props.allGroupList[0].mastersuricata,
        nodesuricata: props.allGroupList[0].nodesuricata
    })

    useEffect(() => {           
        //get group rulesets
        props.getRulesetList(props.groupToDetails.guuid)
        //Reset nodeFileListSelected and showNodeFiles
        props.resetDisplaynodeFileList()
    }, [])

    useEffect(() => {
        //get MD5 data
        props.checkMD5(suriConfigPath)

        //update path when is changed
        SetSuriConfigPath({
            ...suriConfigPath,
            mastersuricata: props.allGroupList[0].mastersuricata,
            nodesuricata: props.allGroupList[0].nodesuricata,
        })
    }, [props.allGroupList])

    const getNodeFiles = (nodeID) => {
        return Object.entries(props.allGroupList || {}).map(([groupID , group]) =>{
            return Object.entries(group.Nodes || {}).map(([nodesID , node]) =>{    
            
                if(node.nuuid == nodeID){
                    return Object.entries(props.MD5files || {}).map(([MD5nodesID , MD5node]) =>{
                        if(node.nuuid == MD5nodesID){
                            return Object.entries(MD5node || {}).map(([id , md5Values]) =>{
                                return <table width="100%" key={id} className="table table-hover table-layout-fixed">
                                    <tbody>
                                        <tr key={id}>
                                            <td><b>File: </b>{md5Values.nodePath}</td>
                                            <td><b>Master MD5: </b>{md5Values.masterMD5}</td>
                                            <td><b>Node MD5: </b>{md5Values.nodeMD5}</td>
                                            <td width="5%">
                                                {
                                                    md5Values.equals == "true"
                                                    ?
                                                    <span className="badge badge-pill bg-success align-text-bottom text-white">&nbsp;</span>
                                                    :
                                                    (
                                                        md5Values.equals == "false"
                                                        ?
                                                        <span className="badge badge-pill bg-danger align-text-bottom text-white">&nbsp;</span>
                                                        :
                                                        <span className="badge badge-pill bg-dark align-text-bottom text-white">&nbsp;</span>
                                                    )
                                                }
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>                                    
                            })
                        }
                    })
                }
            })
        })
    }

    const MD5Content = () => {
        var nodes = []
        const totalList = Object.entries(props.allGroupList || {}).map(([groupID , group]) =>{
            return Object.entries(group.Nodes || {}).map(([nodesID , node]) =>{
                return Object.entries(props.MD5files || {}).map(([MD5nodesID , MD5node]) =>{
                    if(node.nuuid == MD5nodesID){
                        return Object.entries(MD5node || {}).map(([id , md5Values]) =>{
                            if (!nodes.includes(node.nuuid)){

                                nodes.push(node.nuuid)

                                return <React.Fragment key={node.nuuid}>
                                    <tr key={node.nuuid}>
                                        <td>{node.nname}</td>
                                        <td>{node.nip}</td>
                                        <td>
                                            <FaFolderOpen size={21} className="iconBlue" onClick={() => {props.toggleNodeFiles(node.nuuid)}}/> &nbsp;
                                            {    
                                                md5Values.equals == "true"
                                                ?
                                                <span className="badge badge-pill bg-success align-text-bottom text-white">&nbsp;</span>
                                                :
                                                (
                                                    md5Values.equals == "false"
                                                    ?
                                                    <span className="badge badge-pill bg-danger align-text-bottom text-white">&nbsp;</span>
                                                    :
                                                    <span className="badge badge-pill bg-dark align-text-bottom text-white">&nbsp;</span>
                                                )
                                            }
                                        </td>
                                    </tr>
                                    <tr key={id}>
                                        {   
                                            node.nuuid == props.nodeFileListSelected && props.showNodeFiles
                                            ?                                            
                                            <td colSpan={3}>
                                                {
                                                    getNodeFiles(node.nuuid)                                                    
                                                }
                                            </td>
                                            
                                            :
                                            null
                                        }
                                    </tr>
                                </React.Fragment>
                            }
                        })  
                    }
                })
            })
        })
        return totalList
    }

    return (
        <div>
            <h5 className="mt-3">Node files</h5>
            <table className="table table-hover table-layout-fixed">
                <thead>
                    <tr>
                        <th>Node name</th>
                        <th>Node IP</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {MD5Content()}
                </tbody>
            </table>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        MD5files: state.groups.MD5files,
        groupToDetails: state.groups.groupToDetails,
        allGroupList: state.groups.allGroupList,
        showSuricataConfigPath: state.groups.showSuricataConfigPath,
        rulesetList: state.groups.rulesetList,
        showNodeFiles: state.groups.showNodeFiles,
        nodeFileListSelected: state.groups.nodeFileListSelected,
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
    toggleNodeFiles: (node) => dispatch(ToggleNodeFiles(node)),    
    resetDisplaynodeFileList: () => dispatch(ResetDisplaynodeFileList()),    
})

const withProps = connect(mapStateToProps, mapDispatchToProps);
export default withProps(SuricataNodes)