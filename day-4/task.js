const inputFile = await fetch('day-4/input.txt')
const input = await inputFile.text()
const inputArr = input.split('\n')
inputArr.pop()

let sum = 0

const getListOfNumbers = (str) => str.trim().split(' ')
  .filter((num) => !isNaN(parseFloat(num)))

const cardCopies = {}

let cardsNumber = inputArr.length

inputArr.forEach((line, i) => {
  const [_, cardData] = line.split(':')
  let [winNums, myNums] = cardData.trim().split('|')
  winNums = getListOfNumbers(winNums)
  myNums = getListOfNumbers(myNums)

  let matchesCount = myNums.filter((num) =>
    winNums.some((winNum) => winNum === num)).length

  const copiesLength = cardCopies[i] ?? 0


  for (let k = 1; k <= matchesCount; k++) {
    const addedCardsNumber = copiesLength + 1
    cardCopies[i + k] = (cardCopies[i + k] ?? 0) + addedCardsNumber
    cardsNumber = cardsNumber + addedCardsNumber
  }

  if (matchesCount) {
    sum = sum + Math.pow(2, matchesCount - 1)
  }
})

console.log(sum)
console.log(cardsNumber)
