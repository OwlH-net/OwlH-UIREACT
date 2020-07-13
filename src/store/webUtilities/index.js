import * as ActionTypes from './utils-action-types';

const initialState = {
    spinner: false,
    addNodeForm: false,
    progressBar: false,
    modalActionSelected: {},
    nodeToEdit: {},
    modal: false,
    defaults: false,
    errorAlertShow: false,
    isMasterActive: true,
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
  if(data.defaults == "true"){
    return {
      ...state, 
      defaults: data,
      isMasterActive: true
    }
  }else if(data.code == "ECONNREFUSED" || data.error == "ECONNREFUSED"){
    return {
      ...state, 
      defaults: false,
      isMasterActive: false
    }
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

function toggleProgressBarStatus(state, data) {
  return {
    ...state, 
    progressBar: data
  }
}

function addAlertToAlertList(state, data) {
  return {
    ...state, 
    alertList: [...state.alertList, data]
  }
}

function getModalActionSelected(state, data) {
  return {
    ...state, 
    modalActionSelected: data
  }
}

function saveNodeToEdit(state, data) {
  return {
    ...state, 
    nodeToEdit: data,
    addNodeForm: true
  }
}

function toggleAddNode(state) {
  return {
    ...state, 
    addNodeForm: !state.addNodeForm,
    nodeToEdit: {}
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
    case ActionTypes.TOGGLE_PROGRESS:  
      return toggleProgressBarStatus(state, action.payload);
    case ActionTypes.RESET_CHANGE_PASS_DATA:  
      return resetChangePassAxiosData(state, action.payload);
    case ActionTypes.ADD_ALERT_TO_ALERT_LIST:  
      return addAlertToAlertList(state, action.payload);
    case ActionTypes.DELETE_ALERT_TO_ALERT_LIST:  
      return deleteAlertToAlertList(state, action.payload);
    case ActionTypes.TOGGLE_MODAL:  
      return toggleModalWindowStatus(state, action.payload);
    case ActionTypes.MODAL_ACTION_SELECTED:  
      return getModalActionSelected(state, action.payload);
    case ActionTypes.TOGGLE_ADD_NODE:  
      return toggleAddNode(state);
    case ActionTypes.TOGGLE_EDIT_NODE:  
      return toggleEditNodeForm(state);
    case ActionTypes.NODE_TO_EDIT:  
      return saveNodeToEdit(state, action.payload);
    default:
      return state;
  }
}