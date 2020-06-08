import { createStore, combineReducers, applyMiddleware } from 'redux'
import owlhReducer from './owlh'
import thunk from 'redux-thunk'

function configStore() {
  const appReducer = combineReducers({
    owlhReducer
  })
  const store = createStore(appReducer, applyMiddleware(thunk))
  return store;
}

export default configStore;