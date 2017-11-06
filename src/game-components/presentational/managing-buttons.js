import React from 'react'
import ResetButton from  './reset-button'
import StartButton from  './start-button'
import Blockade from './blockade'

export default class ManagingButtons extends React.Component {
  render() {
    return (
      <div className="game-task-manager">
          <Blockade tipIsShowing={this.props.tipIsShowing}
                    timeAlert={this.props.timeAlert}
                    managingButtonsAreBlocking={this.props.managingButtonsAreBlocking}/>
        <div className="game-start-buttons">
          <StartButton runGame={this.props.runGame}/>
          <ResetButton isPlaying={this.props.isPlaying}
                       tipIsShowing={this.props.tipIsShowing}
                       resetGame={this.props.resetGame}
          />
        </div>
      </div>
    )
  }
}