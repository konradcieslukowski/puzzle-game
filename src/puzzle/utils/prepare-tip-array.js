export default function prepareTipArray(arrayToDisplay) {
  const arrayToSort = arrayToDisplay.map((item )=> item)
  var sorted = arrayToSort.sort(function (a, b) {
    return a.id - b.id;
  })
  return sorted
}