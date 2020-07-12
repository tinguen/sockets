import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import io from 'socket.io-client'

import rootReducer from './reducers'
import createHistory from './history'
import socketActions from './sockets'

import { pushMessage } from './reducers/chats'

export const history = createHistory()

const ENABLE_SOCKETS = true

const initialState = {}
const enhancers = []
const middleware = [thunk, routerMiddleware(history)]

const composeFunc = process.env.NODE_ENV === 'development' ? composeWithDevTools : compose

const composedEnhancers = composeFunc(applyMiddleware(...middleware), ...enhancers)

const store = createStore(rootReducer(history), initialState, composedEnhancers)
let socket

if (typeof ENABLE_SOCKETS !== 'undefined' && ENABLE_SOCKETS) {
  const initSocket = () => {
    socket = io()
    socket.on('connect', () => {
      store.dispatch(socketActions.connected)

      socket.on('disconnect', () => {
        store.dispatch(socketActions.disconnected)
      })

      socket.on('message', (msg) => {
        console.log(msg)
      })
      socket.send('Hello')
    })

    const channel = io('/channels/channel_id')
    channel.on('message', (msg) => {
      store.dispatch(pushMessage('channel_id', msg))
    })
  }

  initSocket()
}
export function getSocket() {
  return socket
}
export default store
