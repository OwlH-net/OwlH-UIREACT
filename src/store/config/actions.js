import * as ActionTypes from './config-action-types';
import {GetUserName, GetToken, RemoveToken} from '../../components/Shared/CheckToken'
import {ToggleProgressBar, AddAlertToAlertList, toggleAlert, PermissionsAlert} from '../webUtilities/actions'
import axios from 'axios'

const config = {
  headers: {
    'Content-Type': 'application/json'
  }
}

export function ToggleAddOrganizationForm(status) {
    return {
      type: ActionTypes.TOGGLE_ADD_ORG,
      payload: status
    }
}

export function ToggleEditOrganization(id) {
    return {
      type: ActionTypes.TOGGLE_EDIT_ORG,
      payload: id
    }
}
  
export function SaveSelectedOrgs(data) {
    return {
        type: ActionTypes.SAVE_SELECTED_ORGS,
        payload: data
    }
}

export function DeleteOrg(orgID) {
    const token = GetToken()
    const username = GetUserName()
  
    let newHeaders = {
      ...config.headers, 
      'user': username,
      'token': token
    }
    let newConfig = {headers: newHeaders}
  
    return (dispatch) => {
      axios.delete('/api/deleteOrg/'+orgID, newConfig)
      .then(resp => {
        dispatch(ToggleProgressBar(false))
  
        if(resp.data.token == "none"){RemoveToken()}
        if(resp.data.permissions == "none"){
          dispatch(PermissionsAlert())
        }else if(resp.data.ack == "false"){
          dispatch(AddAlertToAlertList({
            id: new Date() / 1000+'-valid',
            title: "Error deleting org! ",
            subtitle: resp.data.error,
            variant: "danger"
          }))
          dispatch(toggleAlert(true))
        }else{
          dispatch(GetAllOrgs())
        }
      })
    }
}

export function GetAllOrgs() {
    const token = GetToken()
    const username = GetUserName()
  
    let newHeaders = {
      ...config.headers, 
      'user': username,
      'token': token
    }
    let newConfig = {headers: newHeaders}
  
    return (dispatch) => {
      axios.get('/api/getAllOrganizations', newConfig)
      .then(resp => {
        dispatch(ToggleProgressBar(false))
  
        if(resp.data.token == "none"){RemoveToken()}
        if(resp.data.permissions == "none"){
          dispatch(PermissionsAlert())
        }else if(resp.data.ack == "false"){
          dispatch(AddAlertToAlertList({
            id: new Date() / 1000+'-valid',
            title: "Error getting node organizations! ",
            subtitle: resp.data.error,
            variant: "danger"
          }))
          dispatch(toggleAlert(true))
        }else{
          dispatch(accGetAllOrgs(resp.data))
        }
  
      })
    }
  }
  function accGetAllOrgs(data) {
    return {
      type: ActionTypes.GET_ALL_ORGS,
      payload: data
    }
} 

export function EditOrg(data) {
    const token = GetToken()
    const username = GetUserName()
  
    let newHeaders = {
      ...config.headers, 
      'user': username,
      'token': token
    }
    
    let newConfig = {headers: newHeaders}
  
    return (dispatch)  => {
      axios.put('/api/editOrganization', JSON.stringify(data) ,newConfig)
        .then(resp => {        
          
          dispatch(ToggleProgressBar(false))
          dispatch(ToggleEditOrganization())
          
          if(resp.data.token == "none"){RemoveToken()}
          if(resp.data.permissions == "none"){
            dispatch(PermissionsAlert())
          }else if(resp.data.ack == "false"){
            dispatch(AddAlertToAlertList({
              id: new Date() / 1000+'-valid',
              title: "Edit Organization error ",
              subtitle: resp.data.error,
              variant: "danger"
            }))
            dispatch(toggleAlert(true))
          }else{
            dispatch(GetAllOrgs())
          }
      })
    }
}

export function AddNewOrg(data) {
    const token = GetToken()
    const username = GetUserName()
  
    let newHeaders = {
      ...config.headers, 
      'user': username,
      'token': token
    }
    
    let newConfig = {headers: newHeaders}
  
    return (dispatch)  => {
      axios.put('/api/addOrganization', JSON.stringify(data) ,newConfig)
        .then(resp => {        
          dispatch(ToggleProgressBar(false))
          
          if(resp.data.token == "none"){RemoveToken()}
          if(resp.data.permissions == "none"){
            dispatch(PermissionsAlert())
          }else if(resp.data.ack == "false"){
            dispatch(AddAlertToAlertList({
              id: new Date() / 1000+'-valid',
              title: "Add Organization error ",
              subtitle: resp.data.error,
              variant: "danger"
            }))
            dispatch(toggleAlert(true))
          }else{
            dispatch(GetAllOrgs())
          }
      })
    }
}

export function GetOrganizationNodes(uuid) {
  const token = GetToken()
  const username = GetUserName()

  let newHeaders = {
    ...config.headers, 
    'user': username,
    'token': token
  }
  let newConfig = {headers: newHeaders}

  return (dispatch) => {
    axios.get('/api/getAllOrganizations/'+uuid, newConfig)
    .then(resp => {
      dispatch(ToggleProgressBar(false))

      if(resp.data.token == "none"){RemoveToken()}
      if(resp.data.permissions == "none"){
        dispatch(PermissionsAlert())
      }else if(resp.data.ack == "false"){
        dispatch(AddAlertToAlertList({
          id: new Date() / 1000+'-valid',
          title: "Error getting nodes for an organization ",
          subtitle: resp.data.error,
          variant: "danger"
        }))
        dispatch(toggleAlert(true))
      }else{
        dispatch(accGetnodeForOrg(resp.data))
      }

    })
  }
}
function accGetnodeForOrg(data) {
  return {
    type: ActionTypes.GET_ALL_NODES_ORG,
    payload: data
  }
} 

export function ToggleOrgNodeList(data) {
  return {
    type: ActionTypes.TOGGLE_ORG_NODE_LIST,
    payload: data
  }
} 