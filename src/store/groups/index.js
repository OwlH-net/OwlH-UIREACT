import * as ActionTypes from './group-action-types';

const initialState = {
  allGroupList: [],
  groupToEdit: {},
  groupToDetails: {},
  groupDetails: {},
  showGroupForm: false,
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
      // isEdit: !state.isEdit,
      showGroupForm: !state.showGroupForm,
    }
}

function SaveGroupSelected(state, data) {
  return {
      ...state,
      isEdit: true,
      groupToEdit: data
    }
}

function clearGroupData(state) {
  return {
      ...state,
      isEdit: false,
      groupToEdit: {}
    }
}

function showEditForm(state) {
  return {
      ...state,
      isEdit: true,
    }
}

function GroupToDetails(state, data) {
  return {
      ...state,
      groupToDetails: data,
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
      case ActionTypes.CLEAR_GROUP_DATA:  
        return clearGroupData(state);
      case ActionTypes.SHOW_EDIT_FORM:  
        return showEditForm(state);
      case ActionTypes.GROUP_TO_DETAILS:  
        return GroupToDetails(state, action.payload);
      default:
        return state;
    }
  }