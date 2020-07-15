import React, { useState, useEffect } from 'react'
import { RegisterNode } from '../../../store/node/actions'
import { connect } from 'react-redux';

const NodeStatus = (props) => {    
    let pendingRegistration
    if(props.registrationStatus == "wait"){
        pendingRegistration = <div>                
            <span className="badge bg-warning align-text-bottom text-white">PENDING REGISTRATION</span> <br/>
            {
                props.status == "online" ?
                <span className="badge bg-primary align-text-bottom text-white pointer" onClick={() => {props.registerNode(props.nodeUUID)}}>Try registration now</span>
                :null
            }
            <hr/>
        </div>

    }
    let nodeStatus;
    if(props.status == "online"){
        nodeStatus = <span className="badge bg-success align-text-bottom text-white">ONLINE</span>
    }else if(props.status == "offline"){
        nodeStatus = <span className="badge bg-danger align-text-bottom text-white">OFFLINE</span>
    }else{
        nodeStatus = <span className="badge bg-dark align-text-bottom text-white">N/A</span>
    }

    return (
        <div>
            {pendingRegistration}
            {nodeStatus}
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    registerNode: (node) => dispatch(RegisterNode(node)),
})

const withProps = connect(null, mapDispatchToProps);
export default withProps(NodeStatus)