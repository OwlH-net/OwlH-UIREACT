import * as ActionTypes from './group-action-types';
import {GetUserName, GetToken} from '../../components/Shared/CheckToken'
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