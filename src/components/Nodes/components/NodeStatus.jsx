import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';

const NodeStatus = (props) => {
    console.log(props)


    // if(props.token == "wait"){
    //     return (<span className="badge bg-warning align-text-bottom text-white">PENDING REGISTRATION</span>)
    // }
    // //check if key "data" exist into the object props
    // if('data' in props){
    //     if('ping' in props.data){
    //         return (<span className="badge bg-success align-text-bottom text-white">ONLINE</span>)
    //     }
    //     if('ack' in props.data){
    //         return (<span className="badge bg-danger align-text-bottom text-white">ONLINE</span>)
    //     }
    // }
    
    return (
        <p>{props.status}</p>
    )
}

export default NodeStatus