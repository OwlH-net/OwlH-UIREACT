import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import  SuricataList from './SuricataList'
import { ChangeSuricataStatus } from '../../../../store/groups/actions'
import SuricataRulesets from './SuricataRulesets'
import SuricataConfig from './SuricataConfig'
import SuricataNodes from './SuricataNodes'
import SuricataMasterFilesList from './SuricataMasterFilesList'

const GroupDetailsSuricata = (props) => {

    const [suricataPanel, setSuricataPanel] = useState('current')
    // const [socatAndTcpdump, setSocatAndTcpdump] = useState({
    //     checkSocat: "true",
    //     checkTcpreplay: "true",
    //     checkTcpdump: "true"
    // })

    // useEffect(() => {
    //     checkSocatandTcpdump();
    // }, [])

    // useEffect(() => {
    //     checkSocatandTcpdump();
    // }, [props.SuricataGroupList])

    const changeAllSuricataStatus = (newStatus) => {
        Object.entries(props.SuricataGroupList || {}).map(([id , val]) =>{
            if(id != "installed" && id != "zeek"){
                var data = {
                    uuid: val.uuid,
                    status: newStatus,
                    param: "status",
                    service: props.groupToDetails.guuid,
                    type: val.type,
                    bpf: val.bpf,
                    interface: val.interface,
                }
                props.changeSuricataStatus(data)
            }
        })
    }

    // const checkSocatandTcpdump = () => {
    //     Object.entries(props.SuricataGroupList || {}).map(([id , val]) =>{
    //         if(id == "installed"){   
    //             console.log(val)             
    //             setSocatAndTcpdump({
    //                 // checkSocat: val.checkSocat,
    //                 checkSocat: "false",
    //                 checkTcpreplay: val.checkTcpreplay,
    //                 checkTcpdump: val.checkTcpdump
    //             })   
    //         }
    //     })
    // }

    return (
        <div>
            <div className="my-3">
                {   
                    suricataPanel == "current"
                    ?
                    <div>
                        <span className="badge bg-primary align-text-bottom text-white pointer" onClick={() => {setSuricataPanel('current')}}>Current status</span> &nbsp;
                        <span className="badge bg-secondary align-text-bottom text-white pointer" onClick={() => {setSuricataPanel('configuration')}}>Configuration</span> &nbsp;
                    </div>
                    :
                    <div>
                        <span className="badge bg-secondary align-text-bottom text-white pointer" onClick={() => {setSuricataPanel('current')}}>Current status</span> &nbsp;
                        <span className="badge bg-primary align-text-bottom text-white pointer" onClick={() => {setSuricataPanel('configuration')}}>Configuration</span> &nbsp;
                    </div>
                }
                {/* {   
                    socatAndTcpdump.checkSocat == "false" || socatAndTcpdump.checkTcpreplay == "false"  || socatAndTcpdump.checkTcpdump == "false" 
                    ?
                    <div className="float-right">
                        {socatAndTcpdump.checkSocat == "false" ? <span className="badge badge-pill bg-danger align-text-bottom text-white" >Socat Not installed</span> : <span className="badge badge-pill bg-success align-text-bottom text-white pointer" >Socat installed</span>}
                        {socatAndTcpdump.checkTcpreplay == "false" ? <span className="badge badge-pill bg-danger align-text-bottom text-white" >TcpReplay Not installed</span> : <span className="badge badge-pill bg-success align-text-bottom text-white pointer" >TcpReplay installed</span>}
                        {socatAndTcpdump.checkTcpdump == "false" ? <span className="badge badge-pill bg-danger align-text-bottom text-white" >TcpDump Not installed</span> : <span className="badge badge-pill bg-success align-text-bottom text-white pointer" >TcpDump installed</span>}
                    </div>
                    :
                    null
                } */}
                {   
                    suricataPanel == "current"
                    ?
                        <div>
                            <a className="btn btn-primary float-right text-decoration-none text-white right pointer" onClick={() => {changeAllSuricataStatus("stop")}}>Stop</a> &nbsp;
                            <a className="btn btn-danger float-right text-decoration-none text-white right mx-1 pointer" onClick={() => {changeAllSuricataStatus("start")}}>Start</a> &nbsp;
                            <SuricataList />
                        </div>
                    :
                        <>
                            <a className="btn btn-primary float-right text-decoration-none text-white right" onClick={() => {}}>Sync</a>
                            <SuricataRulesets />
                            <SuricataConfig />
                            <SuricataMasterFilesList />
                            <SuricataNodes />
                        </>
                }
            </div>
            <div className="my-3">
            </div>
        
        </div>
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
    changeSuricataStatus: () => dispatch(ChangeSuricataStatus()),    
})

const withProps = connect(mapStateToProps, mapDispatchToProps);
export default withProps(GroupDetailsSuricata)