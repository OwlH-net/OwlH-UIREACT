import { createStore, combineReducers, applyMiddleware } from 'redux'
import owlhReducer from './owlh'
import login from './login'
import groups from './groups'
import node from './node'
import webUtilities from './webUtilities'
import config from './config'
import thunk from 'redux-thunk'

function configStore() {
  const appReducer = combineReducers({
    owlhReducer,
    login,
    node,
    groups,
    webUtilities,
    config
  })


  
  const store = createStore(appReducer, applyMiddleware(thunk))
  return store;
}

export default configStore;