import React from 'react'
import Head from './head'

const Game = () => {
  return (
    <div>
      <Head title="Hello" />
      <div className="flex items-center justify-center h-screen">
        Game
      </div>
    </div>
  )
}

Game.propTypes = {}

export default React.memo(Game)
