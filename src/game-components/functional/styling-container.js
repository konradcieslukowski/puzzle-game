import React from 'react'
import {Component} from 'react'

export default class StylingContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.gameWindowHeight = null
    this.windowHeight = null
  }

  setGameWindowFormat(gameWindow) {
    this.setState({width: '95%', height: '95%'});
    let currentWidth = gameWindow.offsetWidth,
      currentHeight = gameWindow.offsetHeight
    const ratio = 4 / 3
    if (currentHeight > currentWidth / ratio) {
      let newHeight = currentWidth / ratio
      this.setState({height: newHeight})
    } else if (currentWidth > ratio * currentHeight) {
      let newWidth = ratio * currentHeight
      this.setState({width: newWidth})
    }
  }

  resizeHandler = () => {
    this.setGameWindowFormat(this.gameWindow);
  }

  componentDidMount() {
    this.resizeHandler();
    window.addEventListener('resize', this.resizeHandler)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeHandler);
  }

  render() {
    return (<div className="game-window" ref={div=> this.gameWindow = div} style={this.state}>
      {React.Children.map(this.props.children, (child) => {
          if(child !== null)  {
            return React.cloneElement(child, {...this.state})}
            else {
            return child
          }
        })}
    </div>)
  }
}