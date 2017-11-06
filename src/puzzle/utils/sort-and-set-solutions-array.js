export default function sortAndSetSolutionsArray(itemsDisplayed) {
  let thisLevelSolutionsArray = [],
  thisLevelRandomBlocksArrayToSort = itemsDisplayed.map(item => item)
  thisLevelSolutionsArray = thisLevelRandomBlocksArrayToSort.sort(function (a, b) {
    return a.key - b.key;
  })
  return thisLevelSolutionsArray
}