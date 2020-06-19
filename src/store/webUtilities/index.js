import * as ActionTypes from './utils-action-types';

const initialState = {
    spinner: false,
    defaults: false
}

function defaultCredentials(state, data) {
  console.log("defaultCredentials")
  console.log(state)
  console.log(data)
  console.log("SHOW CREDENTIALS...")
  return {
    ...state, 
    defaults: data
  }
}

function showSpinner(state, data) {
  console.log("SHOW SPINNER...")
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
  console.log("HIDE THE SPINNER...")
  return {
        ...state, 
        spinner: data
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
    default:
      return state;
  }
}