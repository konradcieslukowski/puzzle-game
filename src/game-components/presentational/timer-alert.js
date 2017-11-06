import React from 'react'

const TimeAlert = () => (
  <div className="timer-alert">
    <img className="timer-alert__image"
         src={process.env.PUBLIC_URL + '/app-icons/time-alert.jpg'}
         alt="timer-alert"/>
    <span className="timer-alert__title">You have a time limit! Press "start" button!</span>
  </div>
)

export default TimeAlert