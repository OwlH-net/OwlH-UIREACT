import * as ActionTypes from './node-action-types';

const initialState = {
  allNodesList: {}
}

function getAllNodes(state, data) {
  console.log(data)
  return {
    ...state,
    allNodesList: data
  }
}

export default function webUtilities(state = initialState, action) {
    switch(action.type) {
      case ActionTypes.GET_ALL_NODES:  
        return getAllNodes(state, action.payload);
      default:
        return state;
    }
  }