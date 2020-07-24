import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { FaPlus, FaSyncAlt, FaEdit, FaFolderOpen, FaFile } from "react-icons/fa";
import { ChangeSuricataStatus, CheckMD5, ShowPathInput, HidePathInput, ChangeSuricataConfigGroupPaths } from '../../../../store/groups/actions'
import { ToggleProgressBar } from '../../../../store/webUtilities/actions'

const SuricataConfig = (props) => {

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

        // MD5Content();
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
        //     if(id != "installed" && id != "zeek"){
        //         return <tr key={id}>
        //             <td>{val.nodeName}</td>
        //             {
        //                 val.status == "enabled" 
        //                 ? 
        //                 <td><span className="badge bg-success align-text-bottom text-white">{val.status}</span></td> 
        //                 : 
        //                 <td><span className="badge bg-danger align-text-bottom text-white">{val.status}</span></td> 
        //             }
        //             <td>{val.interface}</td>
        //             <td><FaInfoCircle size={21} className="iconBlue" /></td>
        //         </tr>
        //     }
        })
        return totalList
    }

    const changePaths = () => {
        props.toggleProgressBar(true)
        props.changeSuricataConfigGroupPaths(suriConfigPath)
    }

    const handleChangePaths = (e) => {
        SetSuriConfigPath({
            ...suriConfigPath,
            [event.target.name]: event.target.value
        })
    }

    return (
        <div>
            <a className="btn btn-primary float-right text-decoration-none text-white right" onClick={() => {}}>Sync</a>
            <table className="table table-hover table-layout-fixed">
                <tbody>
                    <tr>
                        <td width="20%">Ruleset <FaPlus size={21} className="iconBlue"/> <FaSyncAlt size={21} className="iconBlue"/> </td>
                        <td colSpan={2}> <b>Here goes the ruleset selected!!</b> </td>
                    </tr>
                    <tr>
                        <td rowSpan={3} width="20%">Configuration &nbsp; 
                            <FaEdit size={21} className="iconBlue" onClick={() => {props.showPathInput()}}/> &nbsp;
                            <FaSyncAlt size={21} className="iconBlue"/> &nbsp;                             
                            <span className="badge bg-primary align-text-bottom text-white pointer">Reload</span>
                        </td>                            
                        <td>Master path <FaFolderOpen size={21} className="iconBlue"/> </td>
                        <td>
                        {
                            props.allGroupList[0].mastersuricata == "" ? <b>No suricata master path selected</b> : props.allGroupList[0].mastersuricata
                        }
                        </td>
                    </tr>                   
                    <tr>
                        <td><FaFile size={21} className="iconBlue"/> <b>Path: </b> </td>
                        <td><b>MD5: </b>{masterMD5}</td>
                    </tr>
                    <tr>
                        <td>Node path</td>
                        <td>
                        {
                            props.allGroupList[0].nodesuricata == "" ? <b>No suricata master path selected</b> : props.allGroupList[0].nodesuricata
                        }
                        </td>
                    </tr>                    
                </tbody>                
            </table>    
            {
                props.showSuricataConfigPath 
                ?
                <table className="table table-hover table-layout-fixed">
                    <tbody>
                        <tr>
                            <td>                              
                                <div className="form-row">
                                    <div className="form-group col-md-12">
                                        <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text wt-125">Master path</span>
                                            </div>
                                            <input type="text" className="form-control" id="mastersuricata" name="mastersuricata" placeholder="Insert master path..." value={suriConfigPath.mastersuricata} onChange={handleChangePaths} />
                                        </div>
                                    </div>                                
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-12">
                                        <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text wt-125">Node path</span>
                                            </div>
                                            <input type="text" className="form-control" id="nodesuricata" name="nodesuricata" placeholder="Insert node path..." value={suriConfigPath.nodesuricata} onChange={handleChangePaths} />
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td width="20%">
                                <a className="btn btn-primary float-right text-decoration-none text-white right pointer" onClick={() => changePaths()}>Save</a>
                                <a className="btn btn-secondary float-right text-decoration-none text-white right pointer mx-2" onClick={() => {props.hidePathInput()}}>Close</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
                :
                null
            }                    
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
})

const withProps = connect(mapStateToProps, mapDispatchToProps);
export default withProps(SuricataConfig)