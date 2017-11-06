import prepareElementsToPlay  from './prepare-elements-to-play'
import prepareElementsToDraw  from './prepare-elements-to-draw'

export default function getElementsToPlay(allShapesObject, currentLevel, game, gameBasicDetailsBeforeSplit) {
  const gameBlocksReadyToDraw = prepareElementsToDraw(currentLevel, game, gameBasicDetailsBeforeSplit)
  return prepareElementsToPlay(allShapesObject, currentLevel, game, gameBlocksReadyToDraw)
}
