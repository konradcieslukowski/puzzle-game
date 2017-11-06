import getJsonModifyingMethods from '../../game-utils/get-json-modyfing-methods'

export default function getThisLevelPlayingElementsData(level, responseData) {
  const gameMethods = getJsonModifyingMethods(level, responseData)
  return gameMethods.getThisLevelImage(level)
}
