import React from 'react'
import Blockade from './blockade'

export default class PlayingBoardWrapper extends React.Component {

  render() {
    const tipClass = this.props.tipIsShowing ? 'tip__background' : null
    const solutionClass = this.props.isSolved ? 'correct-answer__background' : null

    return (
      <div className={`game-task-meritum ${tipClass} ${solutionClass}`}>
        {this.props.isPlaying === true ?
          React.createElement(this.props.PlayingBoard, {
            gameMappedData: this.props.gameMappedData,
            level: this.props.level,
            tipIsShowing: this.props.tipIsShowing,
            arraysPreparedToGame: this.props.arraysPreparedToGame,
            showPrize: this.props.showPrize,
            setGameAsSolved: this.props.setGameAsSolved,
            count: this.props.count,
            isSolved: this.props.isSolved,
            PlayingItemsView: this.props.PlayingItemsView,
          }) : null}
        <Blockade count={this.props.count}
                  isSolved={this.props.isSolved} />
      </div>
    )
  }
}