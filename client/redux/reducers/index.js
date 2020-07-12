import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import chats from './chats'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    chats
  })

export default createRootReducer
