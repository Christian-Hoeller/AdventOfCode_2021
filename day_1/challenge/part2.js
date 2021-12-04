const fs = require("fs");
const reducer = (acc, currentValue, index, array) => {
    if (array.length - index < 3) return acc;
    let sum = 0;
    for (let i = index; i < index + 3; i++){
        sum += array[i];
    }
    return acc.concat(sum)
}
const otherReducer = (acc, currentValue, index, array) => currentValue > array[index - 1] ? acc += 1 : acc;

const measurements = fs.readFileSync("./input.txt", "utf-8")
    .split("\n")
    .map(m => parseInt(m))
    .reduce(reducer, [])
    .reduce(otherReducer, 0)

console.log(measurements)