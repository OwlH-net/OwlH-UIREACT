import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import  SuricataList from './SuricataList'
import  SuricataConfig from './SuricataConfig'
import { ChangeSuricataStatus } from '../../../../store/groups/actions'

const GroupDetailsSuricata = (props) => {

    const [suricataPanel, setSuricataPanel] = useState('current')

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
            </div>
            <div className="my-3">
                {   
                    suricataPanel == "current"
                    ?
                        <div>
                            <a className="btn btn-primary float-right text-decoration-none text-white right" onClick={() => {changeAllSuricataStatus("stop")}}>Stop</a> &nbsp;
                            <a className="btn btn-danger float-right text-decoration-none text-white right mx-1" onClick={() => {changeAllSuricataStatus("start")}}>Start</a> &nbsp;
                            <SuricataList />
                        </div>
                    :
                    <SuricataConfig />
                }
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