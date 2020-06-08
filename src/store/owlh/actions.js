import * as ActionTypes from './action-types';
import axios from 'axios';

const url = 'http://localhost:8081/api/memes'

const config = {
  headers: {
    'Content-Type': 'application/json'
  }
}

export function userLogin(data) {
    console.log("Send User data")
    console.log(data)
    axios.put('/api/login', JSON.stringify(data), config)
      .then(resp => {
        console.log(resp)
        return resp.data
      })
}

export function currentConfiguration(){
  console.log("GET current config")
  return (dispatch)  => {
    axios.get('/api/config')
    .then(resp => {
      console.log(resp)
      const config = resp.data 
      dispatch(getLoadConfiguration(config))
    })
  }
}

function getLoadConfiguration(data) {
  console.log(data)
  console.log("run Action LOAD_CONF")
  return {
    type: ActionTypes.LOAD_CONF,
    payload: data
  }
}

export function saveCurrentConfiguration(data){
  console.log("PUT current config")
  console.log(data)
  return (dispatch)  => {
    axios.put('/api/config', JSON.stringify(data), config)
    .then(resp => {
      console.log(resp)
      dispatch(accSaveConfiguration(data))
    })
  }
}

function accSaveConfiguration(data) {
  console.log(data)
  console.log("run Action SAVE_CONF")
  return {
    type: ActionTypes.SAVE_CONF,
    payload: data
  }
}



export function crearAddMemeAction(meme) {
  return (dispatch)  => {
    axios.post(url, JSON.stringify(meme), config)
      .then(resp => {
        const meme = resp.data
        dispatch(getAddAction(meme))
      })
  }
}

