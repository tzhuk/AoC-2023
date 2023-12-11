const Colors = ['red', 'blue', 'green']
const Cubes = {
  red: 12,
  green: 13,
  blue: 14
};

const inputFile = await fetch('day-2/input.txt')
const input = await inputFile.text()
const inputArr = input.split('\n')
inputArr.pop()

const games = inputArr.map((line) => (
  line
    .replace(/.+: /i, '')
    .split('; ')
    .map((set) => (
      set.split(', ').reduce((acc, val) => {
        const [number, color] = val.split(' ')
        acc[color] = Number(number)
        return acc
      }, {})
    ))
))

console.log(games)

const getSumOfPossibleGames = (games) => {
  let idSum = 0

  games.forEach((sets, i) => {
    const isPossible = sets.every((set) => (
      Colors.every((color) => Cubes[color] >= (set[color] ?? 0))
    ))


    if (isPossible) {
      idSum = idSum + i + 1
    }
  })

  return idSum
}

console.log(getSumOfPossibleGames(games))

const getSumOfPowerOfPossibleSets = (games) => {
  let sum = 0
  games.forEach((sets, i) => {
    const minCubes = {}
    let power = 1
    sets.forEach((set) => {
      Colors.forEach((color) => {
        if ((set[color] ?? 0) > (minCubes[color] ?? 0)) {
          if (minCubes[color]) {
            power = power / minCubes[color]
          }
          minCubes[color] = set[color]
          power = power * set[color]
        }
      })
    })

    sum = sum + power
  })

  return sum
}

console.log(getSumOfPowerOfPossibleSets(games))
