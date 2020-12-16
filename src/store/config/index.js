import * as ActionTypes from './config-action-types';

const initialState = {
  allOrgsList: {},
  AllOrgNodes: {},
  toggleAddOrgForm: false,
  toggleNodesOrgList: false,
  toggleEditOrg: {id:'', status: false},
  orgsSelected: [],
}

function getAllOrgs(state, data) {
  return {
    ...state,
    allOrgsList: data
  }
}

function saveSelectedOrgs(state, data) {
  return {
    ...state,
    orgsSelected: data
  }
}

function toggleAddOrg(state, data) {
  return {
    ...state,
    toggleAddOrgForm: data
  }
}

function toggleOrganization(state, data) {
  var newData;
  if(state.toggleEditOrg.status){
    newData = {id: '', status: false}
  }else{
    newData = {id: data, status: true}
  }
  
  return {
    ...state,
    toggleEditOrg: newData
  }
}

function toggleOrgNodesList(state, data) {
  return {
    ...state,
    toggleNodesOrgList: data
  }
}

function getAllOrgNodes(state, data) {
  return {
    ...state,
    AllOrgNodes: data
  }
}

export default function webUtilities(state = initialState, action) {
    switch(action.type) {
      case ActionTypes.GET_ALL_ORGS:  
        return getAllOrgs(state, action.payload);
      case ActionTypes.SAVE_SELECTED_ORGS:  
        return saveSelectedOrgs(state, action.payload);
      case ActionTypes.TOGGLE_EDIT_ORG:  
        return toggleOrganization(state, action.payload);
      case ActionTypes.TOGGLE_ADD_ORG:  
        return toggleAddOrg(state, action.payload);
      case ActionTypes.TOGGLE_ORG_NODE_LIST:  
        return toggleOrgNodesList(state, action.payload);
      case ActionTypes.GET_ALL_NODES_ORG:  
        return getAllOrgNodes(state, action.payload);
      default:
        return state;
    }
  }