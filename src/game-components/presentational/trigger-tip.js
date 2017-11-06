import React from 'react'

const TipTrigger = ({toggleTip, tipIsShowing, tipTriggerIsBlocking}) => {
  const activeClass = tipIsShowing ? 'tip-trigger--active' : null
  const blockadeClass = tipTriggerIsBlocking ? 'tip-trigger__blockade' : 'tip-trigger__blockade--hide'

  return (
    <div style={{position: 'relative', height: '4.7%'}}>
      <div className={`trigger game-trigger tip-trigger`}
           onClick={toggleTip}>
        <img className={`trigger__icon ${activeClass}`}
             src={tipIsShowing ? process.env.PUBLIC_URL + '/app-icons/tip-trigger-active.svg' : process.env.PUBLIC_URL + '/app-icons/tip-trigger.svg'}
             alt="open-tip"/>
      </div>
      <div className={`${blockadeClass}`}>
      </div>
    </div>
  )
}

export default TipTrigger