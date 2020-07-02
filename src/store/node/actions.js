import * as ActionTypes from './node-action-types';
import {GetUserName, GetToken} from '../../components/Shared/CheckToken'
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

export function PingNode(nodeUUIDS) {
    const token = GetToken()
    const username = GetUserName()

    let newHeaders = {
      ...config.headers, 
      'user': username,
      'token': token
    }
    let newConfig = {headers: newHeaders}
  
    return (dispatch) => {
      axios.get('/api/pingNode/'+nodeUUIDS, newConfig)
      .then(resp => {
        dispatch(accPingNode(resp.data, nodeUUIDS))
      })
    }
  }
function accPingNode(data, nodeUUIDS) {
    return {
      type: ActionTypes.PING_NODE,
      payload: {id:nodeUUIDS, data:data}
    }
}