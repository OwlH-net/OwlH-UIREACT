import * as ActionTypes from './node-action-types';
import {GetUserName, GetToken, RemoveToken} from '../../components/Shared/CheckToken'
import {ToggleProgressBar, AddAlertToAlertList, toggleAlert, PermissionsAlert} from '../webUtilities/actions'
import axios from 'axios'

const config = {
  headers: {
    'Content-Type': 'application/json'
  }
}

export function GetAllNodes() {
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
        dispatch(ToggleProgressBar(false))

        if(resp.data.token == "none"){RemoveToken()}
        if(resp.data.permissions == "none"){
          dispatch(PermissionsAlert())
        }else if(resp.data.ack == "false"){
          dispatch(AddAlertToAlertList({
            id: new Date() / 1000+'-valid',
            title: "Error getting nodes! ",
            subtitle: resp.data.error,
            variant: "danger"
          }))
          dispatch(toggleAlert(true))
        }else if(resp.data.Nodes != null){
          dispatch(accGetAllNodes(resp.data.Nodes))
        }

      })
    }
  }
function accGetAllNodes(data) {
    return {
      type: ActionTypes.GET_ALL_NODES,
      payload: data
    }
}

export function GetAllTags() {
    const token = GetToken()
    const username = GetUserName()
  
    let newHeaders = {
      ...config.headers, 
      'user': username,
      'token': token
    }
    let newConfig = {headers: newHeaders}

    return (dispatch) => {
      axios.get('/api/tags', newConfig)
      .then(resp => {
        dispatch(ToggleProgressBar(false))

        if(resp.data.token == "none"){RemoveToken()}
        if(resp.data.permissions == "none"){
          dispatch(PermissionsAlert())
        }else if(resp.data.ack == "false"){
          dispatch(AddAlertToAlertList({
            id: new Date() / 1000+'-valid',
            title: "Error getting node tags! ",
            subtitle: resp.data.error,
            variant: "danger"
          }))
          dispatch(toggleAlert(true))
        }else{
          dispatch(accGetAllTags(resp.data))
        }

      })
    }
  }
function accGetAllTags(data) {
    return {
      type: ActionTypes.GET_ALL_TAGS,
      payload: data
    }
}

export function SetLoading(id) {
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

      if(resp.data.token == "none"){RemoveToken()}
      if(resp.data.permissions == "none"){
        dispatch(PermissionsAlert())
      }else if(resp.data.ack == "false"){
        dispatch(AddAlertToAlertList({
          id: new Date() / 1000+'-valid',
          title: "Error deleting node ",
          subtitle: resp.data.error,
          variant: "danger"
        }))
        dispatch(toggleAlert(true))
      }else{
        dispatch(GetAllNodes())
      }
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
        
        if(resp.data.token == "none"){RemoveToken()}
        if(resp.data.permissions == "none"){
          dispatch(PermissionsAlert())
        }else if(resp.data.ack == "false"){
          dispatch(AddAlertToAlertList({
            id: new Date() / 1000+'-valid',
            title: "Register node error ",
            subtitle: resp.data.error,
            variant: "danger"
          }))
          dispatch(toggleAlert(true))
        }else{
          dispatch(GetAllNodes())
        }
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

        if(resp.data.token == "none"){RemoveToken()}
        if(resp.data.permissions == "none"){
          dispatch(PermissionsAlert())
        }else if(resp.data.ack == "false"){
          dispatch(AddAlertToAlertList({
            id: new Date() / 1000+'-valid',
            title: "Enroll node error ",
            subtitle: resp.data.error,
            variant: "danger"
          }))
          dispatch(toggleAlert(true))
        }else{
          dispatch(GetAllNodes())
        }
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

      dispatch(ToggleProgressBar(false))
      if(resp.data.token == "none"){RemoveToken()}
      if(resp.data.permissions == "none"){
        dispatch(PermissionsAlert())
      }else if(resp.data.ack == "false"){
        dispatch(AddAlertToAlertList({
          id: new Date() / 1000+'-valid',
          title: "Error editing node ",
          subtitle: resp.data.error,
          variant: "danger"
        }))
        dispatch(toggleAlert(true))
      }else{
        dispatch(AddAlertToAlertList({
          id: new Date() / 1000+'-valid',
          title: "Edit node ",
          subtitle: "The node has been edited successfully!",
          variant: "success"
        }))
        dispatch(toggleAlert(true))

        dispatch(ToggleAddNodeForm())
        dispatch(GetAllNodes())
      }
      
    })
  }
}