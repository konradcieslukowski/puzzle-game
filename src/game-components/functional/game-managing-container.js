import React from 'react'

import PrizeWindowContainer from './prize-window-container'

import Command from '../presentational/command'
import Timer from './timer'
import TriggersWrapper from '../presentational/triggers-wrapper'
import StylingContainer from './styling-container'
import MainWindow from '../presentational/main-window'

import ResultsWindow from '../presentational/results-window'
import PlayingBoardWrapper from '../presentational/playing-board-wrapper'
import ManagingButtons from '../presentational/managing-buttons'
import TimeAlert from '../presentational/timer-alert'
import EndTimeAlert from '../presentational/end-time-alert'
import Blockade from '../presentational/blockade'

import {sortResultsList} from '../../game-utils/sort-results-list'

export default class ManagingContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      level: 1,
      arraysPreparedToGame: null,
      isPlaying: false,
      tipIsShowing: false,
      managingButtonsAreBlocking: false,
      tipTriggerIsBlocking: true,
      gameDataAreRepeating: false,
      prizeIsShowing: false,
      resultsAreShowing: false,
      infoIsShowing: false,
      isSolved: false,
      score: null,
      resultsList: [],
      avatarsOffResultsList: [],
      counter: null,
      count: null,
      gameRound: 0,
      timeAlert: 'show'
    }
  }

  resetGame = () => {
    this.setState({
      gameRound: this.state.gameRound + 1,
      gameDataAreRepeating: false,
      isSolved: false,
      isPlaying: false,
      timerIsDisplaying: false,
      prizeIsShowing: false,
      count: null,
      arraysPreparedToGame: null
    }, () => {
      this.checkTimeRestriction(this.props.gameMappedData, this.state.level)
    })
  }

  checkTimeRestriction(game, currentLevel) {
    const lastLevel = game.levels[game.levels.length - 1].level;
    const level = currentLevel > lastLevel ? 1 : currentLevel
    const timeLimit = game.levels[level - 1].timeRestriction
    if (timeLimit === 0 || timeLimit === undefined) {
      this.runGame()
    } else {
      this.displayTimeAlert()
    }
  }

  runGame = () => {
    this.setState({
      timeAlert: 'hide',
      isPlaying: true,
      tipTriggerIsBlocking: false
    }, () => {
      const count = this.props.gameMappedData.levels[this.state.level - 1].timeRestriction
      if (count > 0) {
        this.addTimer(count);
      }
      if (this.state.gameDataAreRepeating === true) {
        this.setState({state: this.state})
      } else {
        const {getElementsToPlay, gameMappedData, gameData, playerMode} = this.props
        const arraysPreparedToGame = getElementsToPlay(null, this.state.level, gameMappedData, gameData, playerMode, this.state.activePlayerData, this.state.gameRound)
        this.setState({
          arraysPreparedToGame: arraysPreparedToGame
        })
      }
    })
  }

  toggleTip = () => {
    this.setState({tipIsShowing: !this.state.tipIsShowing})
  }

  displayTimeAlert() {
    this.setState({timeAlert: 'show', tipTriggerIsBlocking: true})
  }

  addTimer(count) {
    this.setState({timerIsDisplaying: true, count: count, offsetTop: 100})
  }

  removeTimer = (count, offsetTop) => {
    this.setState({timerIsDisplaying: false, count: 0, offsetTop: null})
  }

  showResults = () => {
    this.setState({resultsAreShowing: true})
  }

  hideResults = () => {
    this.setState({resultsAreShowing: false})
  }

  setGameAsSolved = () => {
    this.setState({isSolved: true})
  }

  getTime = (playerTime) => {
    this.updateResultsList(playerTime)
  }

  updateResultsList(timeResult) {
    this.state.resultsList.push({
      score: this.props.gameMappedData.levels[this.state.level - 1].timeRestriction - timeResult
    })
    const currentList = this.state.resultsList.map(x => x)
    currentList.sort(sortResultsList)
    const updatedList = currentList.map((item, index) => {
      return {...item, position: index + 1}
    })
    this.setState({resultsList: updatedList})
  }

  showPrize = () => {
    this.setState({prizeIsShowing: true})
  }

  hidePrize = () => {
    this.setState({prizeIsShowing: false})
  }

  render() {
    return (
      <div className="game-managing-container">
        <StylingContainer>
          <MainWindow>
            <Command commandFontClass={this.state.commandFontClass}
                     arraysPreparedToGame={this.state.arraysPreparedToGame}
                     isPlaying={this.state.isPlaying}
                     level={this.state.level}
                     tipIsShowing={this.state.tipIsShowing}
                     gameMappedData={this.props.gameMappedData}/>
            <Blockade tipIsShowing={this.state.tipIsShowing}/>
            {this.state.timeAlert === 'show' ? <TimeAlert /> : null}
            <PlayingBoardWrapper tipIsShowing={this.state.tipIsShowing}
                                 isPlaying={this.state.isPlaying}
                                 count={this.state.count}
                                 isSolved={this.state.isSolved}
                                 gameMappedData={this.props.gameMappedData}
                                 arraysPreparedToGame={this.state.arraysPreparedToGame}
                                 level={this.state.level}
                                 solutionArray={this.state.solutionsArray}
                                 tipArray={this.state.tipArray}
                                 showPrize={this.showPrize}
                                 setGameAsSolved={this.setGameAsSolved}
                                 PlayingBoard={this.props.PlayingBoard}
                                 PlayingItemsView={this.props.PlayingItemsView}/>
            <ManagingButtons {...this.state}
                             gameMappedData={this.props.gameMappedData}
                             activePlayerData={this.state.activePlayerData}
                             runGame={this.runGame}
                             resetGame={this.resetGame}
                             isSolved={this.state.isSolved}/>
          </MainWindow>
          <TriggersWrapper thisLevelData={this.props.gameMappedData.levels[this.state.level - 1]}
                           showResults={this.showResults}
                           tipTriggerIsBlocking={this.state.tipTriggerIsBlocking}
                           tipIsShowing={this.state.tipIsShowing}
                           toggleTip={this.toggleTip}/>
          {this.state.timerIsDisplaying === true ?
              <Timer
                offsetTop={this.state.offsetTop}
                count={this.state.count}
                timeRestriction={this.props.gameMappedData.levels[this.state.level - 1].timeRestriction}
                isSolved={this.state.isSolved}
                removeTimer={this.removeTimer}
                getTime={this.getTime}/>: null}
          <ResultsWindow resultsAreShowing={this.state.resultsAreShowing}
                                  hideResults={this.hideResults}
                                  resultsList={this.state.resultsList}/>
          <PrizeWindowContainer level={this.state.level}
                                hidePrize={this.hidePrize}
                                prizeIsShowing={this.state.prizeIsShowing}
                                gameMappedData={this.props.gameMappedData}
                                setWinnerName={this.setWinnerName}/>
          {this.state.count === 0 && !this.state.isSolved ?
            <EndTimeAlert /> : null}
        </StylingContainer>
      </div>
    )
  }
}