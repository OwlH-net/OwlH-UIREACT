import * as ActionTypes from './utils-action-types';

const initialState = {
    spinner: false,
    defaults: false
}

export default function webUtilities(state = initialState, action) {
    switch(action.type) {
      case ActionTypes.SHOW_SPINNER:  
        return showSpinner(state, action.payload);
      case ActionTypes.SHOW_CREDENTIALS_ALERT:  
        return defaultCredentials(state);
      case ActionTypes.HIDE_SPINNER:  
        return hideSpinner(state, action.payload);
      default:
        return state;
    }
}

function defaultCredentials(state, action) {
    console.log("SHOW CREDENTIALS...")
  return {
    ...state, 
    defaults: action
  }
}

function showSpinner(state, action) {
    console.log("SHOW SPINNER...")
  return {
    ...state, 
    spinner: action
  }
}

//This function should return true or false, depending on the action
//This function should return true or false, depending on the action
//This function should return true or false, depending on the action
//This function should return true or false, depending on the action
//This function should return true or false, depending on the action
function hideSpinner(state, action) {
    console.log("HIDE THE SPINNER...")
  return {
        ...state, 
        spinner: action
  }
}