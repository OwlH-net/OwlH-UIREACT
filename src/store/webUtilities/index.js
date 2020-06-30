import * as ActionTypes from './utils-action-types';

const initialState = {
    spinner: false,
    defaults: false,
    errorAlertShow: false,
    passwordChange: {}
}

function toggleAlertStatus(state, data) {
  return {
    ...state,
    errorAlertShow: data
  }
}

function defaultCredentials(state, data) {
  return {
    ...state, 
    defaults: data
  }
}

function changeUserPassword(state, data) {
  return {
    ...state, 
    passwordChange: data
  }
}

function showSpinner(state, data) {
  return {
    ...state, 
    spinner: data
  }
}

//This function should return true or false, depending on the action
//This function should return true or false, depending on the action
//This function should return true or false, depending on the action
//This function should return true or false, depending on the action
//This function should return true or false, depending on the action
function hideSpinner(state, data) {
  return {
        ...state, 
        spinner: data
  }
}

function resetChangePassAxiosData(state, data) {
  return {
    ...state, 
    passwordChange: data
  }
}

export default function webUtilities(state = initialState, action) {
  switch(action.type) {
    case ActionTypes.SHOW_SPINNER:  
      return showSpinner(state, action.payload);
    case ActionTypes.SHOW_CREDENTIALS_ALERT:  
      return defaultCredentials(state, action.payload);
    case ActionTypes.HIDE_SPINNER:  
      return hideSpinner(state, action.payload);
    case ActionTypes.CHANGE_PASSWORD:  
      return changeUserPassword(state, action.payload);
    case ActionTypes.TOGGLE_ALERT:  
      return toggleAlertStatus(state, action.payload);
    case ActionTypes.RESET_CHANGE_PASS_DATA:  
      return resetChangePassAxiosData(state, action.payload);
    default:
      return state;
  }
}