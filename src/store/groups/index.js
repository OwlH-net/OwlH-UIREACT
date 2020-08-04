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
  showNodeFiles: false,
  showMasterFiles: false,
}

function getAllGroups(state, data) {
    return {
      ...state,
      allGroupList: data
    }
}

function displayMasterFiles(state) {
    return {
      ...state,
      showMasterFiles: !state.showMasterFiles
    }
}

function displayGroupForm(state) {
    return {
      ...state,
      isShowGroupForm: true
    }
}

function saveGroupSelected(state, data) {
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

function groupToDetails(state, data) {
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

function getGroupSuricataList(state, data) {
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

function toggleNodeFiles(state) {
  return {
      ...state,
      showNodeFiles: !state.showNodeFiles,
    }
}

export default function webUtilities(state = initialState, action) {
    switch(action.type) {
      case ActionTypes.GET_ALL_GROUPS:  
        return getAllGroups(state, action.payload);
      case ActionTypes.DISPLAY_FORM_GROUP:  
        return displayGroupForm(state);
      case ActionTypes.SAVE_EDIT_FORM:  
        return saveGroupSelected(state, action.payload);
      case ActionTypes.CLEAR_EDIT_FORM:  
        return clearGroupFormData(state);
      case ActionTypes.SHOW_EDIT_FORM:  
        return showEditForm(state);
      case ActionTypes.GROUP_TO_DETAILS:  
        return groupToDetails(state, action.payload);
      case ActionTypes.GET_NODES_GROUP:  
        return getAllNodesGroup(state, action.payload);
      case ActionTypes.HIDE_EDIT_FORM:  
        return hideAllNodesGroup(state);
      case ActionTypes.GET_ALL_SURICATA_GROUP:  
        return getGroupSuricataList(state, action.payload);
      case ActionTypes.SHOW_PATH_INPUT:  
        return showInputPathSuricata(state);
      case ActionTypes.HIDE_PATH_INPUT:  
        return hideInputPathSuricata(state);
      case ActionTypes.TOGGLE_SHOW_NODE_FILES:  
        return toggleNodeFiles(state);
      case ActionTypes.GET_MD5_FILES:  
        return getMD5Files(state, action.payload);
      case ActionTypes.DISPLAY_RULESET_LIST:  
        return displayRulesetList(state, action.payload);
      case ActionTypes.GET_RULESET_LIST:  
        return getRulesetList(state, action.payload);
      case ActionTypes.DISPLAY_MASTER_FILES:  
        return displayMasterFiles(state);
      default:
        return state;
    }
}