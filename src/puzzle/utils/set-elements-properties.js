export default function setElementsProperties(selectedElements) {
  selectedElements.forEach(function (block, index) {
    block.id = parseInt(index, 10) + 1;
    block.key = parseInt(index, 10) + 1;
  })
  return selectedElements;
}

