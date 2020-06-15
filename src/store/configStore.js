import { createStore, combineReducers, applyMiddleware } from 'redux'
import owlhReducer from './owlh'
import login from './login'
import thunk from 'redux-thunk'

function configStore() {
  const appReducer = combineReducers({
    owlhReducer,
    login
  })


  
  const store = createStore(appReducer, applyMiddleware(thunk))
  return store;
}

export default configStore;