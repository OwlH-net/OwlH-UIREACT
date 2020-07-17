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
        dispatch(ToggleGroupForm())
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
        dispatch(ToggleGroupForm())
        dispatch(GetAllGroups())
      })
    }
}

export function ToggleGroupForm() {
    return {
      type: ActionTypes.TOGGLE_FORM_GROUP
    }
}

export function SaveGroupSelected(data) {
    return {
      type: ActionTypes.TOGGLE_EDIT_FORM,
      payload: data
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