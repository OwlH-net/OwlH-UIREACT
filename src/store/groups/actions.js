import * as ActionTypes from './group-action-types';
import {GetUserName, GetToken} from '../../components/Shared/CheckToken'
import {ToggleProgressBar} from '../webUtilities/actions'
import axios from 'axios'

const config = {
  headers: {
    'Content-Type': 'application/json'
  }
}

export function GetAllGroups() {
    const token = GetToken()
    const username = GetUserName()
  
    let newHeaders = {
      ...config.headers, 
      'user': username,
      'token': token
    }
    let newConfig = {headers: newHeaders}

    return (dispatch) => {
      axios.get('/api/groups', newConfig)
      .then(resp => {
        dispatch(accGetAllGroups(resp.data))
        dispatch(ToggleProgressBar(false))
      })
    }
  }
function accGetAllGroups(data) {
    return {
      type: ActionTypes.GET_ALL_GROUPS,
      payload: data
    }
}

export function AddGroup(data) {
    const token = GetToken()
    const username = GetUserName()
  
    let newHeaders = {
      ...config.headers, 
      'user': username,
      'token': token
    }
    let newConfig = {headers: newHeaders}

    return (dispatch) => {
      axios.post('/api/group', JSON.stringify(data), newConfig)
      .then(resp => {
        dispatch(ToggleProgressBar(false))
        dispatch(GetAllGroups())
      })
    }
}

export function EditGroupSelected(data) {
    const token = GetToken()
    const username = GetUserName()
  
    let newHeaders = {
      ...config.headers, 
      'user': username,
      'token': token
    }
    let newConfig = {headers: newHeaders}

    return (dispatch) => {
      axios.put('/api/editGroup', JSON.stringify(data), newConfig)
      .then(resp => {
        dispatch(ToggleProgressBar(false))
        dispatch(GetAllGroups())
      })
    }
}

export function ShowGroupForm() {
    return {
      type: ActionTypes.DISPLAY_FORM_GROUP
    }
}

export function SaveGroupSelected(data) {
    return {
      type: ActionTypes.SAVE_EDIT_FORM,
      payload: data
    }
}

export function GroupToDetails(data) {
    return {
      type: ActionTypes.GROUP_TO_DETAILS,
      payload: data
    }
}

export function CloseGroupForm() {
    return {
      type: ActionTypes.CLEAR_EDIT_FORM
    }
}

export function ShowEditForm() {
    return {
      type: ActionTypes.SHOW_EDIT_FORM
    }
}

export function DeleteGroup(nodeUUID) {
  const token = GetToken()
  const username = GetUserName()

  let newHeaders = {
    ...config.headers, 
    'user': username,
    'token': token
  }
  let newConfig = {headers: newHeaders}

  return (dispatch) => {
    axios.delete('/api/deleteGroup/'+nodeUUID, newConfig)
    .then(resp => {
      dispatch(ToggleProgressBar(false))
      dispatch(GetAllGroups())
    })
  }
}

export function ShowNodesGroupForm(guuid) {
  const token = GetToken()
  const username = GetUserName()

  let newHeaders = {
    ...config.headers, 
    'user': username,
    'token': token
  }
  let newConfig = {headers: newHeaders}

  return (dispatch) => {
    axios.get('/api/getAllNodesGroup/'+guuid, newConfig)
    .then(resp => {
      dispatch(accShowNodesGroupForm(resp.data))
      dispatch(ToggleProgressBar(false))
    })
  }
}
function accShowNodesGroupForm(data) {
  return {
    type: ActionTypes.GET_NODES_GROUP,
    payload: data
  }
}

export function HideAllNodesGroup() {
  return {
    type: ActionTypes.HIDE_EDIT_FORM
  }
}

export function AddNodesToGroup(data) {
  const token = GetToken()
  const username = GetUserName()

  let newHeaders = {
    ...config.headers, 
    'user': username,
    'token': token
  }
  let newConfig = {headers: newHeaders}

  return (dispatch) => {
    axios.put('/api/addGroupNodes', JSON.stringify(data), newConfig)
    .then(resp => {
      dispatch(ToggleProgressBar(false))
      dispatch(HideAllNodesGroup())
      dispatch(GetAllGroups())
    })
  }
}

export function AnalyzerStatus(data) {
  const token = GetToken()
  const username = GetUserName()

  let newHeaders = {
    ...config.headers, 
    'user': username,
    'token': token
  }
  let newConfig = {headers: newHeaders}

  return (dispatch) => {
    axios.put('/api/analyzer', JSON.stringify(data), newConfig)
    .then(resp => {
      dispatch(GetAllGroups())
    })
  }
}

export function SyncAnalyzer(data) {
  const token = GetToken()
  const username = GetUserName()

  let newHeaders = {
    ...config.headers, 
    'user': username,
    'token': token
  }
  let newConfig = {headers: newHeaders}

  return (dispatch) => {
    axios.put('/api/syncAnalyzerData', JSON.stringify(data), newConfig)
    .then(resp => {
      dispatch(GetAllGroups())
    })
  }
}

export function DeleteGroupNode(nodeUUID) {
  const token = GetToken()
  const username = GetUserName()

  let newHeaders = {
    ...config.headers, 
    'user': username,
    'token': token
  }
  let newConfig = {headers: newHeaders}

  return (dispatch) => {
    axios.delete('/api/deleteNodeGroup/'+nodeUUID, newConfig)
    .then(resp => {
      dispatch(ToggleProgressBar(false))
      dispatch(GetAllGroups())
    })
  }
}