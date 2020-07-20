import * as ActionTypes from './action-types';
import axios from 'axios'
import {SetToken, RemoveToken} from '../../components/Shared/CheckToken'
import {hideSpinner} from '../webUtilities/actions'
// import Spinner from '../../components/Shared/Spinner'

const config = {
  headers: {
    'Content-Type': 'application/json'
  }
}

//GetLoginToken
export function userLogin(credentials) {
  return (dispatch)  => {
    axios.put('/api/login', JSON.stringify(credentials), config)
      .then(resp => {
        //set token
        resp.data.ack == "true" ? SetToken(resp.data.token) : RemoveToken()
        dispatch(hideSpinner())

        //dispatch
        dispatch(getLoginToken(resp.data))
    })
  }
}

function getLoginToken(data) {
  return {
    type: ActionTypes.LOGIN_TOKEN,
    payload: data
  }
}

export function currentConfiguration(){
  return (dispatch)  => {
    axios.get('/api/config')
    .then(resp => {
      const config = resp.data 
      dispatch(getLoadConfiguration(config))
    })
  }
}

function getLoadConfiguration(data) {
  return {
    type: ActionTypes.LOAD_CONF,
    payload: data
  }
}

export function saveCurrentMasters(data){
    axios.put('/api/config', JSON.stringify(data), config)
    .then(resp => {
    })
}

export function saveCurrentConfiguration(data){
  return (dispatch)  => {
    axios.put('/api/config', JSON.stringify(data), config)
    .then(resp => {
      dispatch(accSaveConfiguration(data))
    })
  }
}

function accSaveConfiguration(data) {
  return {
    type: ActionTypes.SAVE_CONF,
    payload: data
  }
}

// export function crearAddMemeAction(meme) {
//   return (dispatch)  => {
//     axios.post(url, JSON.stringify(meme), config)
//       .then(resp => {
//         const meme = resp.data
//         dispatch(getAddAction(meme))
//       })
//   }
// }

//loadCurrentMasters
export function loadCurrentMasters(){
  return (dispatch) => {
    // axios.get('/api/config')
    // .then(resp => {
    //   console.log("------>"+resp)
    //   const config = resp.data 
    //   dispatch(getLoadConfiguration(config))
    // })
    dispatch(getLoadCurrentMasters(data))
  }
}
function getLoadCurrentMasters(data) {
  return {
    type: ActionTypes.LOAD_MASTERS,
    payload: data
  }
}


export function newMaster(data){
  return (dispatch) => {
    dispatch(accAddMaster(data))
  }
}

//addMaster
function accAddMaster(data) {
  return {
    type: ActionTypes.ADD_MASTER,
    payload: data
  }
}

//delete master
export function deleteMaster(data){
  return (dispatch) => {
    dispatch(accDeleteMaster(data))
  }
}
function accDeleteMaster(data) {
  return {
    type: ActionTypes.DELETE_MASTER,
    payload: data
  }
}

//toggle master for active/disable
export function toggleMaster(data){
  return (dispatch) => {
    dispatch(accToggleMaster(data))
  }
}

function accToggleMaster(data) {
  return {
    type: ActionTypes.SET_ACTIVE_MASTER,
    payload: data
  }
}
