import React from 'react'

export default class Timer extends React.Component {
state={
  counter: null,
  count: null,
  offsetTop: null,
}

  stopAndRemoveTimer() {
    clearInterval(this.state.counter);
    this.props.removeTimer(this.state.count, this.state.offsetTop)
  }

  activateTimer() {
    var counter = setInterval(this.countDown.bind(this), 1000)
    this.setState({counter, count: this.props.count, offsetTop: this.props.offsetTop})
  }

  countDown() {
    if (this.state.count > 0) {
      this.setState({
        count: this.state.count - 1,
        offsetTop: this.state.offsetTop - (100 / this.props.timeRestriction)
      })
    } else if (this.state.count === 0) {
      this.stopAndRemoveTimer();
      this.props.stopTimeHandler()
    }
  }

  componentDidMount() {
    this.activateTimer()
  }

  componentWillReceiveProps({isSolved, infoIsShowing, getTime}) {
    if (isSolved === true) {
      this.stopAndRemoveTimer()
      if (getTime !== undefined){
        getTime(this.state.count)
      }
    }
  }

  componentWillUnmount () {
    clearInterval(this.state.counter);
  }

  render() {
    const transition = {
      top: this.state.offsetTop + '%'
    }
    return (
      <div className="clock">
        <div className="clock__progress-bar" style={transition}>
        </div>
      </div>
    )
  }
}
