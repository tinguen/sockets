import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import io from 'socket.io-client'
// import { fetchMessages } from '../redux/reducers/chats'

const Chat = () => {
  const [msg, setMsg] = useState('')
  const currentChat = useSelector((s) => s.chats.currentChat)
  const chats = useSelector((s) => s.chats.chats)
  const chat = chats[currentChat.id]
  const dispatch = useDispatch()
  useEffect(() => {
    // if (chat && !chat.messages) dispatch(fetchMessages(currentChat.id))
  }, [chats, currentChat.id, dispatch, chat])
  return (
    <div className="w-full flex flex-col">
      <div className="border-b flex px-6 py-2 items-center">
        <div className="flex flex-col">
          <h3 className="text-grey-darkest text-md mb-1 font-extrabold">
            #{chats[currentChat.id]?.name}
          </h3>
        </div>
        <div className="ml-auto hidden md:block">
          <input type="search" placeholder="Search" className="border border-grey rounded-lg p-2" />
        </div>
      </div>

      <div className="px-6 py-4 flex-1 overflow-scroll-x">
        {(chat?.messages || []).map((message) => {
          return (
            <React.Fragment key={message.id}>
              <div className="flex items-start mb-4">
                <div className="flex flex-col">
                  <div className="flex items-end">
                    <span className="font-bold text-md mr-2 font-sans">{message.sender.email}</span>
                    <span className="text-grey text-xs font-light">{message.updatedAt}</span>
                  </div>
                  <p className="font-light text-md text-grey-darkest pt-1">{message.content}</p>
                </div>
              </div>
            </React.Fragment>
          )
        })}
      </div>

      <div className="flex m-6 rounded-lg border-2 border-grey overflow-hidden">
        <span className="text-3xl text-grey px-3 border-r-2 border-grey">+</span>
        <input
          type="text"
          className="w-full px-4"
          placeholder="Message to #general"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button
          type="button"
          onClick={() => {
            const path = `/channels/${currentChat.id}`
            const socket = io(path)
            socket.emit('message', msg)
            setMsg('')
          }}
        >
          Send
        </button>
      </div>
    </div>
  )
}

Chat.propTypes = {}

export default Chat
