import React from 'react'
import ReactDOM from 'react-dom'

import GameWindowSurround from './game-components/presentational/game-window-surround'
import ManagingContainer from './game-components/functional/game-managing-container'
import PlayingBoard from './puzzle/components/functional/playing-board-container'

import fetchPuzzleData from  './fetch-puzzle-data'
import mapGameData from './game-utils/map-json-data'
import getElementsToPlay from './puzzle/utils/get-elements-to-play'

import './game-css/game-inside.css'
import './game-css/game-surround.css'
import './game-css/game-triggers.css'
import './game-css/image-preloader.css'
import './game-css/prize.css'
import './game-css/command.css'
import './game-css/results-window.css'
import './game-css/timer.css'
import './puzzle/puzzle.css'

const Game = (data) => {
  const game = mapGameData(data.data, 'puzzle');
  const gameMappedData = game.game,
    gameData = game.daneGry;

  const gameApp = <GameWindowSurround>
    <ManagingContainer gameMappedData={gameMappedData}
                       gameData={gameData}
                       getElementsToPlay={getElementsToPlay}
                       PlayingBoard={PlayingBoard}
    />
  </GameWindowSurround>
  return gameApp
}


fetchPuzzleData().then(gameData => {
  ReactDOM.render(<Game data={gameData}/>, document.getElementById('root'));
})
