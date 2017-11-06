import React from 'react'

const PrizeWindowNoAvatars = ({prizeIsShowing, timeRestriction}) => {
  const visibilityClass = prizeIsShowing ? 'prize--fadein' :'prize--hide'

  return (timeRestriction > 0 ? (
      <div className={`prize ${visibilityClass}`}>
        <img src={process.env.PUBLIC_URL + '/app-icons/winner-trophy.png'}
             alt="trophy"/>
        <span>Congrats!</span>

      </div>) : null
  )
}

export default  PrizeWindowNoAvatars