export default function setReorderedArray(randomIndexArray, dedicatedArray) {
  let properArray = []
  randomIndexArray.forEach(function (value) {
    properArray.push(dedicatedArray[value])
  })
  return properArray
}
