import React from 'react'

const ResetButton = ({tipIsShowing, resetGame, isPlaying}) => {
  const clickHandler = (e) => {
    tipIsShowing ? e.preventDefault() : resetGame()
  }
  const visibilityClass = isPlaying === true ? 'show-table' : 'hide'
  const cssClasses = 'button--alignment button--reset'

  return (
    <div className={cssClasses + ' ' + visibilityClass}
         onClick={clickHandler}>
      <span className={`button__content--alignment`}>RESET</span>
    </div>
  )
}

export default ResetButton