import * as ActionTypes from './group-action-types';

const initialState = {
    allGroupList: [],
    addGroupForm: false
}

function getAllGroups(state, data) {
    return {
      ...state,
      allGroupList: data
    }
}

function ToggleAddGroupForm(state) {
  console.log(state)
    return {
      ...state,
      addGroupForm: !state.addGroupForm
    }
}

export default function webUtilities(state = initialState, action) {
    switch(action.type) {
      case ActionTypes.GET_ALL_GROUPS:  
        return getAllGroups(state, action.payload);
      case ActionTypes.TOGGLE_ADD_GROUP:  
        return ToggleAddGroupForm(state);
      default:
        return state;
    }
  }