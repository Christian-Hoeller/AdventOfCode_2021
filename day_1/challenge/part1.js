const fs = require("fs");
const reducer = (acc, currentValue, index, array) => currentValue > array[index - 1] ? acc += 1 : acc;
const measurements = fs.readFileSync("./input.txt", "utf-8")
    .split("\n")
    .map(m => parseInt(m))
    .reduce(reducer, 0);

console.log(measurements)