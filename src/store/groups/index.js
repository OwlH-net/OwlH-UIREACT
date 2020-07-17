import * as ActionTypes from './group-action-types';

const initialState = {
  allGroupList: [],
  groupToEdit: {},
  addGroupForm: false,
  isEdit: false,
}

function getAllGroups(state, data) {
    return {
      ...state,
      allGroupList: data
    }
}

function ToggleGroupForm(state) {
    return {
      ...state,
      isEdit: false,
      addGroupForm: !state.addGroupForm
    }
}

function SaveGroupSelected(state, data) {
  return {
      ...state,
      isEdit: true,
      groupToEdit: data
    }
}

export default function webUtilities(state = initialState, action) {
    switch(action.type) {
      case ActionTypes.GET_ALL_GROUPS:  
        return getAllGroups(state, action.payload);
      case ActionTypes.TOGGLE_FORM_GROUP:  
        return ToggleGroupForm(state);
      case ActionTypes.TOGGLE_EDIT_FORM:  
        return SaveGroupSelected(state, action.payload);
      default:
        return state;
    }
  }