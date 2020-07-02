import * as ActionTypes from './node-action-types';

const initialState = {
  allNodesList: {},
  nodeStatus: []
}

function getAllNodes(state, data) {
  return {
    ...state,
    allNodesList: data
  }
}

function pingNode(state, data) {
  return {
    ...state,
    nodeStatus: [...state.nodeStatus, data]
  }
}

export default function webUtilities(state = initialState, action) {
    switch(action.type) {
      case ActionTypes.GET_ALL_NODES:  
        return getAllNodes(state, action.payload);
      case ActionTypes.PING_NODE:  
        return pingNode(state, action.payload);
      default:
        return state;
    }
  }