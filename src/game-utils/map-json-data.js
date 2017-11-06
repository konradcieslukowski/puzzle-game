export default function mapJsonData(daneGry, featureType) {
  // create object with mapped data
  var game = {}
  game.levels = []
  // assign json data to new properties
  daneGry.poziomy.forEach(function (poziom, index) {
    game.levels.push({
      level: index + 1,
      command: daneGry.poziomy[index].polecenie,
      timeRestriction: daneGry.poziomy[index].czas_na_rozwiązanie,
      tip: daneGry.poziomy[index].podpowiedź,
      blocksToDisplay: daneGry.poziomy[index].ile_wyświetlić,
    })
  })
  game.levels.forEach(function (level, index) {
    if (featureType === 'puzzle') {
      level.rows = daneGry.poziomy[index].ile_rzędów;
      level.columns = daneGry.poziomy[index].ile_kolumn
    }
  })
  return {
    game: game,
    daneGry: daneGry
  };
}