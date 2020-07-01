import * as ActionTypes from './node-action-types';
import {GetUserName, GetToken} from '../../components/Shared/CheckToken'
import axios from 'axios'

const config = {
  headers: {
    'Content-Type': 'application/json'
  }
}

export function getAllNodes() {
  console.log("============> actions getAllNodes <<<<<<<<<<<<<<<<")
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