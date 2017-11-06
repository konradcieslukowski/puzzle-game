import sortAndSetSolutionsArray from './sort-and-set-solutions-array'
import extractRandomNumbers from '../../game-utils/extract-random-numbers'
import setReorderedArray from '../../game-utils/set-reordered-array'
import prepareTipArray from './prepare-tip-array'

export default function prepareElementsToPlay(allShapesObject, properLevel, game, gameBlocksReadyToDraw) {

  const itemsInRow = game.levels[properLevel-1].columns
// define puzzle positions on start
  var counterLeft = - 100
  var expectedLeft = 0

  const positionsLeft = gameBlocksReadyToDraw.map((item, index) => {
    if (index % itemsInRow === 0) {
      expectedLeft = 0
      return {...item, left: expectedLeft }
    } else {
      expectedLeft += counterLeft
      return {...item, left: expectedLeft }
    }
  })

  var counterTop = - 100
  var expectedTop = 0
  
  const positionsTop = positionsLeft.map((item, index)=> {
    if(index % itemsInRow === 0 && index > 0) {
      expectedTop += counterTop
      return {...item, top: expectedTop}
    } else {
      return {...item, top: expectedTop}
    }
  })

  // randomize items
  const randomItemsNumbers = extractRandomNumbers(gameBlocksReadyToDraw.length, gameBlocksReadyToDraw),
    itemsToDisplay = setReorderedArray(randomItemsNumbers, positionsTop),
    solution = sortAndSetSolutionsArray(itemsToDisplay),
    tipArray = prepareTipArray(itemsToDisplay)

  // check if randomized items order (keys) !== solution order (keys)
  const randomizedSameAsSolution=[];
  for (var i=0; i< solution.length; i ++) {
    if(itemsToDisplay[i].key === solution[i].key) {
      randomizedSameAsSolution.push(true)
    }
  }
  // turn order of items if drawn as solution
  if (randomizedSameAsSolution.length === solution.length) {
    randomizedSameAsSolution.sort(function (a,b) {
      return b.key-a.key
    })
  }


  return {
    playArray: itemsToDisplay,
    solutionsArray: solution,
    tipArray: tipArray,
    rows: game.levels[properLevel - 1].rows,
    columns: game.levels[properLevel - 1].columns
  };
}
