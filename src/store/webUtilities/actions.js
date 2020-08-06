import * as ActionTypes from './utils-action-types';
import {GetUserName, GetToken} from '../../components/Shared/CheckToken'
import {getAllNodes} from '../node/actions'
import axios from 'axios'

const config = {
  headers: {
    'Content-Type': 'application/json'
  }
}

export function PermissionsAlert() {
  return (dispatch) => {
    var newAlert = {
      id: new Date() / 1000+'-valid',
      title: "Error! ",
      subtitle: "You don't have enough permissions for this action.",
      variant: "warning"
    }
    dispatch(AddAlertToAlertList(newAlert))
    dispatch(toggleAlert(true))
  }
}

export function defaultCredentials() {
  return (dispatch) => {
    //check default credentials
    axios.get('/api/about', config)
    .then(resp => {
      dispatch(getDefaultCredentials(resp.data))
    })
  }
}
function getDefaultCredentials(data) {
  return {
    type: ActionTypes.SHOW_CREDENTIALS_ALERT,
    payload: data
  }
}

export function changePassword(data) {

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
    axios.put('/api/pass', JSON.stringify(data), newConfig)
    .then(resp => {
      dispatch(setChangePassword(resp.data))
    })
  }
}
function setChangePassword(data) {
  return {
    type: ActionTypes.CHANGE_PASSWORD,
    payload: data
  }
}

export function showSpinner() {
  return {
    type: ActionTypes.SHOW_SPINNER,
    payload: true
  }
}
  
export function hideSpinner() {
  return {
    type: ActionTypes.HIDE_SPINNER,
    payload: false
  }
}
  
  
export function toggleAlert(data) {
  return {
    type: ActionTypes.TOGGLE_ALERT,
    payload: data
  }
}
  
export function ResetAxiosChangePass() {
  return {
    type: ActionTypes.RESET_CHANGE_PASS_DATA,
    payload: {}
  }
}
  
export function AddAlertToAlertList(alert) {
  return {
    type: ActionTypes.ADD_ALERT_TO_ALERT_LIST,
    payload: alert
  }
}
  
export function DeleteAlertToAlertList(alert) {
  return {
    type: ActionTypes.DELETE_ALERT_TO_ALERT_LIST,
    payload: alert
  }
}
  
export function ToggleModalWindow(status) {
  return {
    type: ActionTypes.TOGGLE_MODAL,
    payload: status
  }
}
  
export function ModalButtonClicked(option) {
  return {
    type: ActionTypes.MODAL_ACTION_SELECTED,
    payload: option
  }
}
  
export function ToggleProgressBar(status) {
  return {
    type: ActionTypes.TOGGLE_PROGRESS,
    payload: status
  }
}
  
export function SaveFileDataToDisplay(dataFile, dataType) {
  return {
    type: ActionTypes.FILE_TO_DISPLAY,
    payload: {
      file: dataFile, 
      type: dataType, 
    }
  }
}
  
export function GetFileContent(data) {

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
    axios.put('/api/getFileContent', JSON.stringify(data), newConfig)
    .then(resp => {
      dispatch(ToggleProgressBar(false))
      dispatch(accFileContentToDisplay(resp.data))
    })
  }
}
  
export function accFileContentToDisplay(data) {
  return {
    type: ActionTypes.FILE_CONTENT_TO_DISPLAY,
    payload: data
  }
}