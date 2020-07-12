import Cookies from 'universal-cookie'

import { history } from '..'

const UPDATE_LOGIN = 'UPDATE_LOGIN'
const UPDATE_PASSWORD = 'UPDATE_PASSWORD'
const LOGIN = 'LOGIN'
const SET_CHATS = 'SET_CHATS'

const cookies = new Cookies()
const initialState = {
  email: '',
  password: '',
  token: cookies.get('token'),
  user: {},
  channels: [{ id: 'channel_id', name: 'test' }],
  chats: {
    channel_id: {
      id: 'channel_id',
      name: 'test',
      messages: [
        {
          id: 'abcd',
          content: 'test',
          sender: { id: '5f0b3489590b48e904a6eafb', email: 'sasha@mail.ru' }
        }
      ]
    }
  },
  currentChat: { id: 'channel_id' }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_LOGIN: {
      return { ...state, email: action.email }
    }

    case LOGIN: {
      return { ...state, token: action.token, password: '', user: action.user }
    }

    case UPDATE_PASSWORD: {
      return { ...state, password: action.password }
    }

    case SET_CHATS: {
      return { ...state, chats: action.chats }
    }
    default:
      return state
  }
}

export function updateLoginField(email) {
  return { type: UPDATE_LOGIN, email }
}

export function updatePasswordField(password) {
  return { type: UPDATE_PASSWORD, password }
}

export function trySignIn() {
  return (dispatch) => {
    fetch('/api/v1/auth')
      .then((r) => r.json())
      .then((data) => {
        dispatch({ type: LOGIN, token: data.token, user: data.user })
        history.push('/private')
      })
  }
}

export function tryGetUserInfo() {
  return () => {
    fetch('/api/v1/user-info')
      .then((r) => r.json())
      .then((data) => {
        console.log(data)
      })
  }
}

export function signIn() {
  return (dispatch, getState) => {
    const { email, password } = getState().auth
    fetch('/api/v1/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })
      .then((r) => r.json())
      .then((data) => {
        dispatch({ type: LOGIN, token: data.token, user: data.user })
        history.push('/private')
      })
  }
}

export function pushMessage(id, message) {
  return async (dispatch, getState) => {
    const chats = { ...getState().chats.chats }
    if (!(id in chats)) return { type: '' }
    chats[id].messages.push(message)
    return dispatch({ type: SET_CHATS, chats })
  }
}
