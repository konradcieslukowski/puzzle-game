import React from 'react'

const StartButton = ({runGame}) => (
      <div  className="button--alignment button--start" onClick={runGame}>
        <span className={`button__content--alignment`}>START</span>
      </div>
    )

export default StartButton