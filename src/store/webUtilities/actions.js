import * as ActionTypes from './utils-action-types';
import axios from 'axios'

const config = {
  headers: {
    'Content-Type': 'application/json'
  }
}

export function defaultCredentials() {
  return (dispatch) => {
    //check default credentials
    axios.get('/api/about', config)
    .then(resp => {
      dispatch(getDefaultCredentials(resp.data.defaults))
    })
  }
}
function getDefaultCredentials(data) {
  return {
    type: ActionTypes.SHOW_CREDENTIALS_ALERT,
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