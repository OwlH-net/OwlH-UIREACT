import * as ActionTypes from './node-action-types';

const initialState = {
  allNodesList: [],
  allTagsList: {},
  tagsSelected: [],
  groupsSelected: [],
  sortIP: 'asc',
  search: '',
  sortName: 'asc',
  filterByStatus: 'all',
  addNodeForm: false,
  nodeToEdit: {},
  isEditNode: false,
}

function ShowNodes(state, data) {
  return {
    ...state,
    filterByStatus: data
  }
}

function getAllNodes(state, data) {
  return {
    ...state,
    allNodesList: data
  }
}

function saveTags(state, data) {
  return {
    ...state, 
    tagsSelected: data
  }
}

function getAllTags(state, data) {
  return {
    ...state,
    allTagsList: data
  }
}

function saveNodeToEdit(state, data) {
  return {
    ...state, 
    nodeToEdit: data,
    addNodeForm: true,
    isEditNode: true
  }
}

function toggleAddNode(state) {
  return {
    ...state, 
    addNodeForm: !state.addNodeForm,
    nodeToEdit: {},
    isEditNode: false
  }
}

function resetLoadingNode(state, id) {
  const finalNodeList = Object.entries(state.allNodesList || {}).map((item) => {
    if(item[0] == id){   
      item[1] = {
        ...item[1],
        loading: false
      }
      return item
    }
    return item
  })  
  return {
    ...state
  }
}

function setLoadingNode(state, id) {
  const finalNodeList = Object.entries(state.allNodesList || {}).map((item) => {
    if(item[0] == id){   
      item[1] = {
        ...item[1],
        loading: true
      }
      return item
    }
    return item
  })  
  return {
    ...state
  }
}

function sortTableIP(state) {
  var toogleSort;
  {state.sortIP == 'asc' ? toogleSort = 'desc' : toogleSort = 'asc'}
  return {
    ...state,
    sortIP: toogleSort
  }
}
function sortTableName(state) {
  var toogleSort;
  {state.sortName == 'asc' ? toogleSort = 'desc' : toogleSort = 'asc'}
  return {
    ...state,
    sortName: toogleSort
  }
}

function SetSearchBar(state, data) {
  return {
    ...state,
    search: data
  }
}

function saveSelectedGroups(state, data) {
  return {
    ...state,
    groupsSelected: data
  }
}


export default function webUtilities(state = initialState, action) {
    switch(action.type) {
      case ActionTypes.GET_ALL_NODES:  
        return getAllNodes(state, action.payload);
      case ActionTypes.GET_ALL_TAGS:  
        return getAllTags(state, action.payload);
      case ActionTypes.PING_NODE:  
        return pingNode(state, action.payload);
      case ActionTypes.RESET_LOADING_NODE:  
        return resetLoadingNode(state, action.payload);
      case ActionTypes.SET_LOADING_NODE:  
        return setLoadingNode(state, action.payload);
      case ActionTypes.FILTER_BY_STATUS:  
        return ShowNodes(state, action.payload);
      case ActionTypes.SORT_BY_IP:  
        return sortTableIP(state);
      case ActionTypes.SORT_BY_NAME:  
        return sortTableName(state);
      case ActionTypes.SEARCH_BAR_VALUES:  
        return SetSearchBar(state, action.payload);
      case ActionTypes.TOGGLE_ADD_NODE:  
        return toggleAddNode(state);
      case ActionTypes.NODE_TO_EDIT:  
        return saveNodeToEdit(state, action.payload);
      case ActionTypes.SAVE_SELECTED_TAGS:  
        return saveTags(state, action.payload);
      case ActionTypes.SAVE_SELECTED_GROUPS:  
        return saveSelectedGroups(state, action.payload);
      default:
        return state;
    }
  }