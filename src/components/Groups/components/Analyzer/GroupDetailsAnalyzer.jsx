import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { AnalyzerStatus, SyncAnalyzer } from '../../../../store/groups/actions'
import { ToggleProgressBar } from '../../../../store/webUtilities/actions'
import { FaEdit, FaSyncAlt } from "react-icons/fa";

const GroupDetailsAnalyzer = (props) => {
    useEffect(() => {
        nodesForThisGroup(props.groupToDetails.guuid)
    }, [props.allGroupList])

    const ChangeAnalyzerStatus = (analyzerStatus) => {
        props.toggleProgressBar(true)
        Object.entries(props.allGroupList || {}).map(([id , val]) =>{
            Object.entries(val.Nodes || {}).map(([nodesId , nodes]) =>{
                props.analyzerStatus({
                    uuid: nodes.nuuid,
                    type: "groups",
                    status: analyzerStatus,
                })
            })
        })
        props.toggleProgressBar(false)
    }

    // const nodesForThisGroup = () => {   
    //      return Object.entries(props.allGroupList[0].Nodes || {}).map(([nodesId , nodes]) =>{
    //         return <tr key={nodesId}>
    //             <td>{nodes.nname}</td>
    //             <td>{nodes.nip}</td>
    //             {
    //                 nodes.nstatus == "Enabled"
    //                 ?
    //                 <td><span className="badge bg-success align-text-bottom text-white float-left mr-2 pointer">{nodes.nstatus}</span></td>
    //                 :
    //                 <td><span className="badge bg-danger align-text-bottom text-white float-left mr-2 pointer">{nodes.nstatus}</span></td>
    //             }
    //         </tr>
    //     })
    // }

    const nodesForThisGroup = (guuid) => {   
        const totalList = Object.entries(props.allGroupList || {}).map(([id , val]) =>{
            if(val.guuid == guuid){
                return Object.entries(val.Nodes || {}).map(([nodesId , nodes]) =>{
                    return <tr key={nodesId}>
                        <td>{nodes.nname}</td>
                        <td>{nodes.nip}</td>
                        {
                            nodes.nstatus == "Enabled"
                            ?
                            <td><span className="badge bg-success align-text-bottom text-white float-left mr-2 pointer">{nodes.nstatus}</span></td>
                            :
                            <td><span className="badge bg-danger align-text-bottom text-white float-left mr-2 pointer">{nodes.nstatus}</span></td>
                        }
                    </tr>
                })
            }
        });
        return totalList
    }

    const SyncAnalyzerData = (guuid) => {   
        props.syncAnalyzer({
            uuid: guuid
        })
    }

    return (
        <div className="my-3">            
            <table className="table table-hover table-layout-fixed">
                <tbody>
                    <tr>
                        <td>
                            <span className="badge bg-success align-text-bottom text-white float-left mr-2 pointer" onClick={()=>{ChangeAnalyzerStatus("Disabled")}}>Disable all</span>
                            <span className="badge bg-primary align-text-bottom text-white float-left mr-2 pointer" onClick={()=>{ChangeAnalyzerStatus("Enabled")}}>Enable all</span>
                        </td>
                        <td>Edit Analyzer <FaEdit size={21} className="iconBlue"/></td>
                        <td>Synchronize Analyzer <FaSyncAlt size={21} className="iconBlue" onClick={() => {SyncAnalyzerData(props.groupToDetails.guuid)}}/></td>
                    </tr>
                </tbody>
            </table>
            <table className="table table-hover table-layout-fixed">
                <thead>
                    <tr>
                        <th>Node name</th>
                        <th>Node IP</th>
                        <th>Node status</th>
                    </tr>
                </thead>
                <tbody>
                    {nodesForThisGroup(props.groupToDetails.guuid)}
                </tbody>
            </table>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        groupNodes: state.groups.groupNodes,
        groupToDetails: state.groups.groupToDetails,
        isAddNodesToGroup: state.groups.isAddNodesToGroup,
        groupNodes: state.groups.groupNodes,
        allGroupList: state.groups.allGroupList,
    }
}
const mapDispatchToProps = (dispatch) => ({
    toggleProgressBar: (status) => dispatch(ToggleProgressBar(status)),
    analyzerStatus: (data) => dispatch(AnalyzerStatus(data)),
    syncAnalyzer: (data) => dispatch(SyncAnalyzer(data)),
    // hideAllNodesGroup: () => dispatch(HideAllNodesGroup()),
    // addNodesToGroup: (nodes) => dispatch(AddNodesToGroup(nodes)),
})

const withProps = connect(mapStateToProps, mapDispatchToProps);
export default withProps(GroupDetailsAnalyzer)