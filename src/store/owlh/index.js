import * as ActionTypes from './action-types';
import { InitialState } from './initialState'

const initialState = InitialState


function loadConfigurationFrom(state, config) {
  return {
    master: config["master"],
    port: config["port"]
  }
}

export default function owlh(state = initialState, action) {
  // console.log('RED: ', action)
  // console.log('STATE: ', state)
  console.log(action)
  console.log("OWLH REDUCER")
  switch(action.type) {
    case ActionTypes.ADD_NODE:
      return addMeme(state, action.payload);
    case ActionTypes.LOAD_CONF:
      console.log("LOAD_CONF CASE")
      console.log(state)
      console.log(action.payload)
      return loadConfigurationFrom(state, action.payload);
    default:
      return state;
  }
}
