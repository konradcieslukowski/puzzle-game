import getThisLevelPlayingElementsData from './get-this-level-playing-elements-data'
import setElementsProperties from './set-elements-properties'

import _ from 'lodash'

export default function prepareElementsToDraw(currentLevel, game, gameBasicDetailsBeforeSplit) {
  // get image to multiply
  const item = getThisLevelPlayingElementsData(currentLevel, gameBasicDetailsBeforeSplit);
  const qty = game.levels[currentLevel - 1].columns * game.levels[currentLevel - 1].rows
  // return array with length = qty of puzzle's
  const thisLevelItems = _.range(qty).map(el => {
    return {value: item[0]}
  })
  return setElementsProperties(thisLevelItems);
}