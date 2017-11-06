import React from 'react'

export default class ResultsWindow extends React.Component {
  render() {
    const visibilityClass = this.props.resultsAreShowing === true ? 'game-results-window game-results-window--show' : 'game-results-window game-results-window--hide'
    const resultsList = this.props.resultsList
    return (
      <div className={visibilityClass}
           onClick={this.props.hideResults}>
        <div className="results__headbar">
          <div className="results__title">Best results</div>
        </div>
        <div className="results__content">
          {resultsList.map((player, index)=> (
            <div className="result__row" key={index}>
              <div className="result__index">{index + 1}.</div>
              <div className="result__player-score">{`${player.score}`} sec.</div>
            </div>
          )) }
        </div>
      </div>
    )
  }
}