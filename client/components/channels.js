import React from 'react'
import { useSelector } from 'react-redux'

const Channels = () => {
  const channels = useSelector((s) => s.chats.channels)
  return (
    <>
      <div className="px-4 mb-2 font-sans">Channels</div>
      {channels.map((ch) => {
        return (
          <React.Fragment key={ch.id}>
            <div className="bg-teal-dark mb-6 py-1 px-4 text-white font-semi-bold ">
              <span className="pr-1 text-grey-500">#</span> {ch.name}
            </div>
          </React.Fragment>
        )
      })}
    </>
  )
}

Channels.propTypes = {}

export default Channels
