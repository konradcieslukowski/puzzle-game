export default function getJsonModifyingMethods(level, responseData) {

  responseData.getThisLevelImage = function (thisLevel) {
    return this.poziomy[thisLevel - 1].obraz
  }
  return responseData;
}
