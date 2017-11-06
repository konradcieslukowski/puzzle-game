import _ from 'lodash'

export default function extractRandomNumbers(qtyRequired, availableItems) {
  let remainingList = [],
      indexList = _.range(availableItems.length);
  const extractedItems = _.range(qtyRequired).map(function () {
    if (remainingList.length === 0) {
      remainingList = indexList.map(value => value)
    }
    return remainingList.splice(Math.floor(Math.random() * remainingList.length), 1)
  })
  const extractedNumbers = [].concat.apply([], extractedItems)

  return extractedNumbers
}