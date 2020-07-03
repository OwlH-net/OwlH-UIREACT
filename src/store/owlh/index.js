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
  console.log("deleteMasterElement Current STATE")
  console.log(state)
  const newMasterList = state.masterList.filter(master => master.name != idMaster);
  saveCurrentMasters(newMasterList)
  return {
    masterList: newMasterList 
  }
}

function setActiveMaster(state, idMaster) {
  console.log("toggleMasterElement Current STATE")
  console.log(state)
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
  console.log("CONSOLE STATE: ")
  console.log(state)
  console.log("CASE ACTION TYPE")
  console.log(action.type)
  console.log("OWLH REDUCER")
  switch(action.type) {
    case ActionTypes.LOAD_CONF:
      console.log("LOAD_CONF CASE")
      return loadCurrentMasters(state, action.payload);
    case ActionTypes.LOGIN_TOKEN:
      console.log("LOGIN_TOKEN CASE")
      return loadToken(state, action.payload);
    case ActionTypes.LOAD_MASTERS:
      console.log("LOAD_MASTERS CASE")
      return loadCurrentMasters(state, action.payload)
    case ActionTypes.ADD_MASTER:
      console.log("ADD_MASTER CASE")
      return addNewMaster(state, action.payload)
    case ActionTypes.DELETE_MASTER:
      console.log("DELETE_MASTER CASE")
      return deleteMasterElement(state, action.payload)
    case ActionTypes.SET_ACTIVE_MASTER:
      console.log("SET_ACTIVE_MASTER CASE")
      return setActiveMaster(state, action.payload)
    default:
      return state;
  }
}
