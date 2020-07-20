import * as ActionTypes from './action-types';
import { InitialState } from './initialState'
import { saveCurrentMasters } from './actions'


// const initialState = InitialState
const initialState = {
    masterList: [InitialState]
}


function loadConfigurationFrom(state, config) {
  return {
    master: config["master"],
    port: config["port"]
  }
}

function loadToken(state, data) {
  return state
}

function loadCurrentMasters(state, data) {
  return {
    masterList: data
  }
}

function addNewMaster(state, nMaster) {
    // if data.name exists, then we are editing
  const newMasterList = state.masterList.filter(master => master.name != nMaster.name);
  const data = [...newMasterList, nMaster]
  saveCurrentMasters(data)

  return {
    masterList: data
  }
}

function deleteMasterElement(state, idMaster) {
  const newMasterList = state.masterList.filter(master => master.name != idMaster);
  saveCurrentMasters(newMasterList)
  return {
    masterList: newMasterList 
  }
}

function setActiveMaster(state, idMaster) {
  const newMasterList = state.masterList.map(master => {
    if(master.name == idMaster){
      master.active = !master.active
    } else {
      master.active = false
    }
  })
  saveCurrentMasters(state.masterList)
  return {
    masterList: [...state.masterList]
  }
}

export default function owlh(state = initialState, action) {
  switch(action.type) {
    case ActionTypes.LOAD_CONF:
      return loadCurrentMasters(state, action.payload);
    case ActionTypes.LOGIN_TOKEN:
      return loadToken(state, action.payload);
    case ActionTypes.LOAD_MASTERS:
      return loadCurrentMasters(state, action.payload)
    case ActionTypes.ADD_MASTER:
      return addNewMaster(state, action.payload)
    case ActionTypes.DELETE_MASTER:
      return deleteMasterElement(state, action.payload)
    case ActionTypes.SET_ACTIVE_MASTER:
      return setActiveMaster(state, action.payload)
    default:
      return state;
  }
}
