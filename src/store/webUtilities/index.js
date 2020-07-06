import * as ActionTypes from './utils-action-types';

const initialState = {
    spinner: false,
    nodeSelected: '',
    modal: false,
    defaults: false,
    errorAlertShow: false,
    alertList: [],
    passwordChange: {}
}

function toggleModalWindowStatus(state, data) {
  return {
    ...state,
    modal: data
  }
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

function setNodeSelected(state, data) {
  return {
    ...state, 
    nodeSelected: data
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

function addAlertToAlertList(state, data) {
  return {
    ...state, 
    alertList: [...state.alertList, data]
  }
}

function deleteAlertToAlertList(state, data) {
  return {
    ...state, 
    alertList: state.alertList.filter(alert => alert.id != data)
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
    case ActionTypes.ADD_ALERT_TO_ALERT_LIST:  
      return addAlertToAlertList(state, action.payload);
    case ActionTypes.DELETE_ALERT_TO_ALERT_LIST:  
      return deleteAlertToAlertList(state, action.payload);
    case ActionTypes.TOGGLE_MODAL:  
      return toggleModalWindowStatus(state, action.payload);
    case ActionTypes.GET_NODE_SELECTED:  
      return setNodeSelected(state, action.payload);
    default:
      return state;
  }
}