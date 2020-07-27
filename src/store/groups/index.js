import * as ActionTypes from './group-action-types';

const initialState = {
  allGroupList: [],
  groupToEdit: {},
  groupToDetails: {},
  groupNodes: {},
  groupDetails: {},
  SuricataGroupList: {},
  MD5files: {},
  rulesetList: {},
  showRulesetList: false,
  isShowGroupForm: false,
  isAddNodesToGroup: false,
  showSuricataConfigPath: false,
  isEdit: false,
}

function getAllGroups(state, data) {
    return {
      ...state,
      allGroupList: data
    }
}

function DisplayGroupForm(state) {
    return {
      ...state,
      isShowGroupForm: true
    }
}

function SaveGroupSelected(state, data) {
  return {
      ...state,
      groupToEdit: data
    }
}

function clearGroupFormData(state) {
  return {
      ...state,
      isEdit: false,
      isShowGroupForm: false,
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

function getAllNodesGroup(state, data) {
  return {
      ...state,
      groupNodes: data,
      isAddNodesToGroup: true,
    }
}

function hideAllNodesGroup(state) {
  return {
      ...state,
      groupNodes: {},
      isAddNodesToGroup: false,
    }
}

function GetGroupSuricataList(state, data) {
  return {
      ...state,
      SuricataGroupList: data,
    }
}

function showInputPathSuricata(state) {
  return {
      ...state,
      showSuricataConfigPath: true,
    }
}

function hideInputPathSuricata(state) {
  return {
      ...state,
      showSuricataConfigPath: false,
    }
}

function getMD5Files(state, data) {
  return {
      ...state,
      MD5files: data,
    }
}

function getRulesetList(state, data) {
  return {
    ...state,
    rulesetList: data,
    }
}

function displayRulesetList(state, data) {
  return {
      ...state,
      showRulesetList: data,
    }
}

export default function webUtilities(state = initialState, action) {
    switch(action.type) {
      case ActionTypes.GET_ALL_GROUPS:  
        return getAllGroups(state, action.payload);
      case ActionTypes.DISPLAY_FORM_GROUP:  
        return DisplayGroupForm(state);
      case ActionTypes.SAVE_EDIT_FORM:  
        return SaveGroupSelected(state, action.payload);
      case ActionTypes.CLEAR_EDIT_FORM:  
        return clearGroupFormData(state);
      case ActionTypes.SHOW_EDIT_FORM:  
        return showEditForm(state);
      case ActionTypes.GROUP_TO_DETAILS:  
        return GroupToDetails(state, action.payload);
      case ActionTypes.GET_NODES_GROUP:  
        return getAllNodesGroup(state, action.payload);
      case ActionTypes.HIDE_EDIT_FORM:  
        return hideAllNodesGroup(state);
      case ActionTypes.GET_ALL_SURICATA_GROUP:  
        return GetGroupSuricataList(state, action.payload);
      case ActionTypes.SHOW_PATH_INPUT:  
        return showInputPathSuricata(state);
      case ActionTypes.HIDE_PATH_INPUT:  
        return hideInputPathSuricata(state);
      case ActionTypes.GET_MD5_FILES:  
        return getMD5Files(state, action.payload);
      case ActionTypes.DISPLAY_RULESET_LIST:  
        return displayRulesetList(state, action.payload);
      case ActionTypes.GET_RULESET_LIST:  
        return getRulesetList(state, action.payload);
      default:
        return state;
    }
}