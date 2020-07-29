import * as ActionTypes from './node-action-types';
import {GetUserName, GetToken} from '../../components/Shared/CheckToken'
import {ToggleProgressBar} from '../webUtilities/actions'
import axios from 'axios'

const config = {
  headers: {
    'Content-Type': 'application/json'
  }
}

export function getAllNodes() {
    const token = GetToken()
    const username = GetUserName()
  
    let newHeaders = {
      ...config.headers, 
      'user': username,
      'token': token
    }
    let newConfig = {headers: newHeaders}

    return (dispatch) => {
      axios.get('/api/nodes', newConfig)
      .then(resp => {
        //check token for pending reg
        dispatch(ToggleProgressBar(false))
        dispatch(accGetAllNodes(resp.data))
      })
    }
  }
function accGetAllNodes(data) {
    return {
      type: ActionTypes.GET_ALL_NODES,
      payload: data
    }
}

// export function PingNode(nodeUUID) {
//     const token = GetToken()
//     const username = GetUserName()

//     let newHeaders = {
//       ...config.headers, 
//       'user': username,
//       'token': token,
//     }
//     let newConfig = {headers: newHeaders}
      
//     return (dispatch) => {
//       axios.get('/api/pingNode/'+nodeUUID, newConfig)
//       .then(resp => {
//         //manage node status request
//         if("ack" in resp.data){
//           dispatch(accPingNode("offline", nodeUUID))
//         }else{
//           dispatch(accPingNode("online", nodeUUID))
//         }
//       })
//     }
//   }
// function accPingNode(data, nodeUUID) {
//     return {
//       type: ActionTypes.PING_NODE,
//       payload: {id:nodeUUID, status:data}
//     }
// }

export function SetLoading(id) {
    console.log("JAL - Set Loading action")
    console.log(id)
    return (dispatch) => {
        dispatch(setLoadingNode(id))
    }
  }
function setLoadingNode(id) {
    return {
      type: ActionTypes.SET_LOADING_NODE,
      payload: id
    }
}


export function ResetLoading(id) {
    console.log("JAL - Reset Loading action")
    console.log(id)

    return (dispatch) => {
        dispatch(resetLoadingNode(id))
    }
  }
function resetLoadingNode(id) {
    return {
      type: ActionTypes.RESET_LOADING_NODE,
      payload: id
    }
}
      
export function DeleteNode(nodeUUID) {
  const token = GetToken()
  const username = GetUserName()

  let newHeaders = {
    ...config.headers, 
    'user': username,
    'token': token
  }
  let newConfig = {headers: newHeaders}

  return (dispatch) => {
    axios.delete('/api/deleteNode/'+nodeUUID, newConfig)
    .then(resp => {
      dispatch(ToggleProgressBar(false))
      dispatch(getAllNodes())
    })
  }
}

export function RegisterNode(nodeUUID) {
  const token = GetToken()
  const username = GetUserName()

  let newHeaders = {
    ...config.headers, 
    'user': username,
    'token': token
  }
  
  let newConfig = {headers: newHeaders}

  return (dispatch)  => {
    axios.put('/api/registerNode/'+nodeUUID, {} ,newConfig)
      .then(resp => {
        dispatch(ToggleProgressBar(false))
        dispatch(getAllNodes())
    })
  }
}

export function Enroll(data) {
  const token = GetToken()
  const username = GetUserName()

  let newHeaders = {
    ...config.headers, 
    'user': username,
    'token': token
  }
  
  let newConfig = {headers: newHeaders}

  return (dispatch)  => {
    axios.post('/api/enrollNode', JSON.stringify(data) ,newConfig)
      .then(resp => {
        dispatch(ToggleProgressBar(false))
        dispatch(getAllNodes())
    })
  }
}

export function ShowNodes(filter) {
  return {
    type: ActionTypes.FILTER_BY_STATUS,
    payload: filter
  }
}

export function SortTableIP() {
  return {
    type: ActionTypes.SORT_BY_IP
  }
}

export function SortTableName() {
  return {
    type: ActionTypes.SORT_BY_NAME
  }
}

export function SetSearchBar(values) {
  return {
    type: ActionTypes.SEARCH_BAR_VALUES,
    payload: values
  }
}

export function ToggleAddNodeForm() {
  return {
    type: ActionTypes.TOGGLE_ADD_NODE
  }
}
  
export function NodeToEdit(node) {
  return {
    type: ActionTypes.NODE_TO_EDIT,
    payload: node
  }
}
  
export function EditNode(node) {
  const token = GetToken()
  const username = GetUserName()

  let newHeaders = {
    ...config.headers, 
    'user': username,
    'token': token
  }
  let newConfig = {headers: newHeaders}

  return (dispatch) => {    
    //check default credentials
    axios.put('/api/editNode', JSON.stringify(node), newConfig)
    .then(resp => {
      dispatch(ToggleAddNodeForm())
      dispatch(getAllNodes())
    })
  }
}