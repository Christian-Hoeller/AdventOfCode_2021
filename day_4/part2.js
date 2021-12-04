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
    let cols = transformColsToRows(board);
    const wonRow = checkIfWon(drawnNumbers, board)
    const wonCol = checkIfWon(drawnNumbers, cols)
    return wonRow || wonCol;
}

const transformColsToRows = (board) => {
    let cols = [];
    for (let colIndex = 0; colIndex < columns; colIndex++) {
        let newCol = [];
        for (let rowIndex in board) {
            newCol.push(board[rowIndex][colIndex])
        }
        cols.push(newCol)
    }
    return cols;
}

const transformBoard = (board) => {
    return board
        .map(i => i.split("  ").join(" ").trim())
        .map(i => i.split(" "))
}

const checkIfIsLastWonBoard = () => wonBoards.length === boards.length;

let gameEnded = false;
let boardSum = 0;
let lastCalledNumber = 0;
let wonBoards = [];

for (let drawnIndex in drawnNumbers) {
    if (gameEnded) break;
    lastCalledNumber = drawnNumbers[drawnIndex];
    const currentlyDrawnNumbers = drawnNumbers
        .slice(0, drawnNumbers.indexOf(drawnNumbers[drawnIndex]) + 1);
    
    for (let boardIndex in boards) {
        const board = transformBoard(boards[boardIndex]);
        const won = boardWon(currentlyDrawnNumbers, board)
        if (won && !wonBoards.includes(boardIndex)) {
            wonBoards.push(boardIndex);
            const isLastWonBoard = checkIfIsLastWonBoard()
            if (isLastWonBoard) {
                boardSum = calculateBoardSum(currentlyDrawnNumbers, board)
                gameEnded = true;
            }
        }
    }
}

console.log(boardSum * lastCalledNumber)