import * as ActionTypes from './login-action-types';

const initialState = {
    currentMaster: {},
    activeMaster: {}
}

function fulfilMasterDetails(state, master) {
    console.log("Edit Master - State")
    console.log(state)
    console.log(master)
  return {
    ...state, 
    currentMaster: master
  }
}

function setActiveMaster(state, master) {
  console.log("SET Active Master")
  console.log(state)
  return {
    ...state,
    activeMaster: master
  }
}

export default function login(state = initialState, action) {
  console.log("CONSOLE STATE: ")
  console.log(state)
  console.log("CASE ACTION TYPE")
  console.log(action.type)
  console.log("LOGIN REDUCER")


  switch(action.type) {
    case ActionTypes.GET_MASTER_DATA_EDIT:  
      return fulfilMasterDetails(state, action.payload);
    case ActionTypes.LOGIN_SET_ACTIVE_MASTER:  
      return setActiveMaster(state, action.payload);
    default:
      return state;
  }
}