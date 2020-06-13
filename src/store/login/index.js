import * as ActionTypes from './login-action-types';



const initialState = {
    currentMaster: {}
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

export default function login(state = initialState, action) {
  console.log("CONSOLE STATE: ")
  console.log(state)
  console.log("CASE ACTION TYPE")
  console.log(action.type)
  console.log("LOGIN REDUCER")


  switch(action.type) {
    case ActionTypes.GET_MASTER_DATA_EDIT:  
      return fulfilMasterDetails(state, action.payload);
    default:
      return state;
  }
}