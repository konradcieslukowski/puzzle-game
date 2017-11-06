import React from 'react'

const Blockade = ({tipIsShowing, tipTriggerIsBlocking, isSolved, count, managingButtonsAreBlocking, timeAlert}) => {
    const visibilityClass = tipIsShowing === true || tipTriggerIsBlocking === true ||  (managingButtonsAreBlocking === true && timeAlert !== 'show')  || isSolved || count === 0 ? 'show' : 'hide'
    const basicClass = 'game-blockade'
    return (
      <div className={basicClass + ' ' + visibilityClass}>
      </div>
    )
}

export default Blockade