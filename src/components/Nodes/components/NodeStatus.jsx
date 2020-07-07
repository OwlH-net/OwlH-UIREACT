import React, { useState, useEffect } from 'react'
import { RegisterNode } from '../../../store/node/actions'
import { connect } from 'react-redux';

const NodeStatus = (props) => {
    if(props.status == "PENDING REGISTRATION"){
        return (
            <div>
                <span className="badge bg-warning align-text-bottom text-white">PENDING REGISTRATION</span> <br/>
                {/* <span class="badge bg-primary align-text-bottom text-white float-" style="cursor: pointer;" onclick="registerNode(\''+uuid+'\')">Try registration now</span> */}
                <span className="badge bg-primary align-text-bottom text-white pointer" onClick={() => {props.registerNode(props.nodeUUID)}}>Try registration now</span>
            </div>
        )
    }else if(props.status == "online"){
        return (<span className="badge bg-success align-text-bottom text-white">ONLINE</span>)
    }else if(props.status == "offline"){
        return (<span className="badge bg-danger align-text-bottom text-white">OFFLINE</span>)
    }else{
        return (<span className="badge bg-dark align-text-bottom text-white">N/A</span>)
    }
}

const mapDispatchToProps = (dispatch) => ({
    registerNode: (node) => dispatch(RegisterNode(node)),
})

const withProps = connect(null, mapDispatchToProps);
export default withProps(NodeStatus)