import * as ActionTypes from './node-action-types';

const initialState = {
  allNodesList: {}
}

function getAllNodes(state, data) {
  return {
    ...state,
    allNodesList: data
  }
}

function deleteNode(state, data) {
console.log(state.allNodesList)
console.log(data)
  //filter
  const newNodesList = Object.entries(state.allNodesList || {}).filter(node => !node.includes(data));
  // return {
  //   ...state,
  //   allNodesList: data
  // }
}

function pingNode(state, data) {

  const newNode = Object.entries(state.allNodesList || {}).filter(key => {
    
    key[1] = {
      ...key[1],
      status: data.status
    }

    return key[0] == data.id
  })


  if (newNode.length != 0){  
    const newStateAllNodes = {
      ...state.allNodesList, 
      [`${newNode[0][0]}`]: newNode[0][1]
    }

    return {
      ...state,
      allNodesList: newStateAllNodes
    }
  }
  return {
    ...state,
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
  console.log("")
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

export default function webUtilities(state = initialState, action) {
    switch(action.type) {
      case ActionTypes.GET_ALL_NODES:  
        return getAllNodes(state, action.payload);
      case ActionTypes.PING_NODE:  
        return pingNode(state, action.payload);
      case ActionTypes.RESET_LOADING_NODE:  
        return resetLoadingNode(state, action.payload);
      case ActionTypes.SET_LOADING_NODE:  
        return setLoadingNode(state, action.payload);
      case ActionTypes.DELETE_NODE:  
        return deleteNode(state, action.payload);
      default:
        return state;
    }
  }