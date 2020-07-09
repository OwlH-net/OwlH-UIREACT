import * as ActionTypes from './login-action-types';

const initialState = {
    currentMaster: {},
    activeMaster: {}
}

function fulfilMasterDetails(state, master) {
  return {
    ...state, 
    currentMaster: master
  }
}

function setActiveMaster(state, master) {
  return {
    ...state,
    activeMaster: master
  }
}

export default function login(state = initialState, action) {
  switch(action.type) {
    case ActionTypes.GET_MASTER_DATA_EDIT:  
      return fulfilMasterDetails(state, action.payload);
    case ActionTypes.LOGIN_SET_ACTIVE_MASTER:  
      return setActiveMaster(state, action.payload);
    default:
      return state;
  }
}