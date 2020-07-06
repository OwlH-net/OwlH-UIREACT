import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';

const NodeStatus = (props) => {
    if(props.status == "PENDING REGISTRATION"){
        return (<span className="badge bg-warning align-text-bottom text-white">PENDING REGISTRATION</span>)
    }else if(props.status == "online"){
        return (<span className="badge bg-success align-text-bottom text-white">ONLINE</span>)
    }else if(props.status == "offline"){
        return (<span className="badge bg-danger align-text-bottom text-white">OFFLINE</span>)
    }else{
        return (<span className="badge bg-dark align-text-bottom text-white">N/A</span>)
    }
    // //check if key "data" exist into the object props
    // if('data' in props){
    //     if('ping' in props.data){
            
    //     }
    //     if('ack' in props.data){
    //     }
    // }
    
<<<<<<< HEAD
    

    // return (        
    //     <p>{props.status}</p>
    // )
=======
    return (
        <p>{props.status}</p>
    )
>>>>>>> aeac102cedcf81929d9361a9f2c11b2297aa0f86
}

export default NodeStatus