import React from 'react'

const ResultsTrigger = ({showResults}) => (
  <div className={`trigger game-trigger results-trigger`}
       onClick={showResults}>
    <img className="trigger__icon"
         src={process.env.PUBLIC_URL + '/app-icons/results-trigger.svg'}
         alt="results-trigger"/>
  </div>
)

export default ResultsTrigger