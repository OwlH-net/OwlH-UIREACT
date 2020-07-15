import * as ActionTypes from './node-action-types';

const initialState = {
  allNodesList: [],
  sortIP: 'asc',
  search: '',
  sortName: 'asc',
  filterByStatus: 'all'
}

function ShowNodes(state, data) {
  return {
    ...state,
    filterByStatus: data
  }
}

function getAllNodes(state, data) {
  var sortedBaz;
  {state.sortName == 'asc' ? sortedBaz = data.sort(compareAsc) : sortedBaz = data.sort(compareDesc)}
  return {
    ...state,
    allNodesList: sortedBaz
  }
}

function compareAsc(a, b) {
  if (a.name > b.name) return 1;
  if (b.name > a.name) return -1;
  return 0;
}
function compareDesc(a, b) {
  if (a.name < b.name) return 1;
  if (b.name < a.name) return -1;
  return 0;
}

// function pingNode(state, data) {

//   const newNode = Object.entries(state.allNodesList || {}).filter(key => {
    
//     key[1] = {
//       ...key[1],
//       status: data.status
//     }

//     return key[0] == data.id
//   })


//   if (newNode.length != 0){  
//     const newStateAllNodes = {
//       ...state.allNodesList, 
//       [`${newNode[0][0]}`]: newNode[0][1]
//     }

//     return {
//       ...state,
//       allNodesList: newStateAllNodes
//     }
//   }
//   return {
//     ...state,
//   }
// }

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
  console.log(toogleSort)
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
      case ActionTypes.FILTER_BY_STATUS:  
        return ShowNodes(state, action.payload);
      case ActionTypes.SORT_BY_IP:  
        return sortTableIP(state);
      case ActionTypes.SORT_BY_NAME:  
        return sortTableName(state);
      case ActionTypes.SEARCH_BAR_VALUES:  
        return SetSearchBar(state, action.payload);
      default:
        return state;
    }
  }