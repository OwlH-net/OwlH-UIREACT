import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'; 
import { FaFolderOpen } from "react-icons/fa";
import { ChangeSuricataStatus, CheckMD5, ShowPathInput, HidePathInput, ChangeSuricataConfigGroupPaths } from '../../../../store/groups/actions'
import { GetRulesetList } from '../../../../store/groups/actions'
import { ToggleProgressBar } from '../../../../store/webUtilities/actions'

const SuricataNodes = (props) => {

    const [masterMD5, SetMasterMD5] = useState('')
    const [suriConfigPath, SetSuriConfigPath] = useState({
        type: 'suricata',
        uuid: props.groupToDetails.guuid,
        mastersuricata: props.allGroupList[0].mastersuricata,
        nodesuricata: props.allGroupList[0].nodesuricata
    })

    useEffect(() => {           
        //get MD5 data
        props.checkMD5(suriConfigPath)
        //get group rulesets
        props.getRulesetList(props.groupToDetails.guuid)
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

    const MD5Content = () => {
        const totalList = Object.entries(props.allGroupList || {}).map(([groupID , group]) =>{
            return Object.entries(group.Nodes || {}).map(([nodesID , node]) =>{
                return Object.entries(props.MD5files || {}).map(([MD5nodesID , MD5node]) =>{
                    if(node.nuuid == MD5nodesID){
                        return Object.entries(MD5node || {}).map(([id , md5Values]) =>{
                            return <tr key={MD5nodesID}>
                                <td>{node.nname}</td>
                                <td>{node.nip}</td>
                                <td>
                                    <FaFolderOpen size={21} className="iconBlue"/> &nbsp;
                                    {    
                                        md5Values.equals == "true"
                                        ?
                                        <span className="badge badge-pill bg-success align-text-bottom text-white">&nbsp;</span>
                                        :
                                        <span className="badge badge-pill bg-danger align-text-bottom text-white">&nbsp;</span>                                        
                                    }
                                </td>
                            </tr>
                        })  
                    }
                })
            })
        })
        return totalList
    }

    return (
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
export default withProps(SuricataNodes)