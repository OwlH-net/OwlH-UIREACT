import * as ActionTypes from './group-action-types';

const initialState = {
    allGroupList: {}
}

function getAllNodes(state, data) {
    return {
      ...state,
      allGroupList: data
    }
  }

export default function webUtilities(state = initialState, action) {
    switch(action.type) {
      case ActionTypes.GET_ALL_GROUPS:  
        return getAllNodes(state, action.payload);
      default:
        return state;
    }
  }