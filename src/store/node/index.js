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

function pingNode(state, data) {

  //filter by id and add node status (unregistered status has token == wait)
  // const newAllNodeList = Object.entries(state.allNodesList).filter(node => {
  //   console.log(node[0] != data.id)
  //   node[0] != data.id
  // });
  const newNode = Object.entries(state.allNodesList || {}).filter(node => {
    return node[0] == data.id
  });
  console.log(newNode)


  const nodeModified = {
    ...newNode[0][1], 
    status: data.status
  }

  const finalNodeList = Object.entries(state.allNodesList || {}).map((item) => {
    if(item[0] == data.id){   
      item[1] = nodeModified
      return item
    }
    return item
  })  

  return {
    ...state,
    allNodesList: finalNodeList
  }
  // return{state}
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