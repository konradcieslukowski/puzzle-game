export default function checkCurrentAnswers(currentArray, solutionArray) {
  const correctAnswers = []
  currentArray.forEach((item, index) => {
    if (item.id === solutionArray[index].id) {
      correctAnswers.push(true)
    }
  })
const winning = checkIfAllCorrect(correctAnswers, solutionArray);
  return winning
}

function checkIfAllCorrect(correctAnswers, solutionArray) {
  if(correctAnswers.length === solutionArray.length) {
    return true
  }
}