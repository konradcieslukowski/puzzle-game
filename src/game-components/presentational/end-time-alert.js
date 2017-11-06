import React from 'react'

export default class EndTimeAlert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {visibilityClass: null}
  }

  render() {
    const basicClass = 'time-end'
    return (
      <div className={basicClass + ' ' + this.state.visibilityClass}>
      <img src={process.env.PUBLIC_URL + '/app-icons/game-time-end.svg'} alt="time-end"/>
        <div>End of Time ! Try again...</div>
      </div>
    )
  }
}