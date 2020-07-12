import React, { useState, useEffect } from 'react'
import Head from './head'
import './game.scss'

const Game = ({ height = 5, width = 5 }) => {
  const [gameField, setGameField] = useState(
    new Array(height * width).fill(null).map((it, index) => {
      return {
        id: index,
        state: 'free'
      }
    })
  )

  const getRandomField = () => {
    const gameFieldFree = gameField.filter((it) => it.state === 'free')
    return gameFieldFree[Math.floor(Math.random() * gameFieldFree.length)].id
  }

  const [selected, setSelected] = useState(getRandomField())
  const [tid, setTimeoutId] = useState(null)

  const updateState = (id, state) => {
    setGameField(
      gameField.map((it) => {
        return {
          ...it,
          state: it.id === id ? state : it.state
        }
      })
    )
    setSelected(getRandomField())

    clearTimeout(tid)
  }

  const chooseNextRound = (selected2) => {
    const timeoutId = setTimeout(() => {
      updateState(selected2, 'computer')
    }, 1000)
    setTimeoutId(timeoutId)
  }

  useEffect(() => {
    const computerFields = gameField.filter((it) => it.state === 'computer')
    const userFields = gameField.filter((it) => it.state === 'user')

    if (computerFields.length > (width * height) / 2) {
      alert('computer win')
      setSelected(null)
    }
    if (userFields.length > (width * height) / 2) {
      alert('user win')
      setSelected(null)
    }
    if (computerFields.length <= (width * height) / 2 && userFields.length <= (width * height) / 2) {
      chooseNextRound(selected)
    }
  }, [selected])

  return (
    <div>
      <Head title="Hello" />
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-wrap" style={{ flexBasis: `${width * 48}px` }}>
          {gameField.map((it) => {
            const classes = `
             ${it.state === 'free' ? ' bg-gray-200' : ''}
             ${it.id === selected ? ' bg-yellow-200' : ''}
             ${it.state === 'user' ? ' bg-green-200' : ''}
             ${it.state === 'computer' ? ' bg-red-200' : ''}
            `
            return (
              <button
                className={`box border-gray-500 border-2${classes}`}
                key={it.id}
                type="button"
                aria-label="click"
                onClick={() => {
                  if (it.id === selected) {
                    updateState(it.id, 'user')
                  }
                }}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

Game.propTypes = {}

export default React.memo(Game)
