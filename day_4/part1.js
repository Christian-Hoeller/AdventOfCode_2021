const fs = require("fs");
const columns = 5;
const data = fs.readFileSync("./inputs.txt", "utf-8").split("\n\n");
const drawnNumbers = data[0].split(",").map(n => parseInt(n));
const boards = data.splice(1, data.length - 1).map(row => row.split("\n"))

const checkIfWon = (drawnNumbers, rows) => {
    for (let i in rows) {
        const row = rows[i].map(i => parseInt(i));
        const matchingItems = row.filter(i => drawnNumbers.includes(i)).length;
        if (matchingItems === 5) {
            return true;
        }
    }
    return false
}

const calculateBoardSum = (drawnNumbers, board) => {
    let sum = 0;
    for (let i in board) {
        const row = board[i].map(i => parseInt(i));
        sum += row
            .filter(item => !drawnNumbers.includes(item))
            .reduce((acc, current) => acc + current, 0);
    }
    return sum;
}

const boardWon = (drawnNumbers, board) => {
    let cols = [];
    for (let i = 0; i < columns; i++) {
        let newCol = [];
        for (let j in board) {
            newCol.push(board[j][i])
        }
        cols.push(newCol)
    }
    const wonRow = checkIfWon(drawnNumbers, board)
    const wonCol = checkIfWon(drawnNumbers, cols)
    return wonRow || wonCol;
}

let gameEnded = false;
let boardSum = 0;
let lastCalledNumber = 0;

for (let i in drawnNumbers) {
    if(gameEnded) break;
    lastCalledNumber = drawnNumbers[i];
    const currentlyDrawnNumbers = drawnNumbers
        .slice(0, drawnNumbers.indexOf(drawnNumbers[i]) + 1);
    for (let j in boards) {
        const board = boards[j]
            .map(i => i.split("  ").join(" ").trim())
            .map(i => i.split(" "))
        const won = boardWon(currentlyDrawnNumbers, board)
        if (won) {
            boardSum = calculateBoardSum(currentlyDrawnNumbers, board)
            gameEnded = true;
        }
    }
}

console.log(boardSum * lastCalledNumber)