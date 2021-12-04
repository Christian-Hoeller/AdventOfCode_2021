const fs = require("fs");
const diagnostics = fs.readFileSync("./input.txt", "utf-8").split("\n");

const length = diagnostics[0].length;
let ones = 0;
let zeros = 0;

let gammaString = "";
let epsilonString = "";
for (let column = 0; column < length; column++) {
    for (let row in diagnostics) {
        const diagnostic = diagnostics[row];
        const value = diagnostic[column];
        value.startsWith("0") ? zeros++ : ones++;
    }
    if (ones > zeros) {
        epsilonString += "0";
        gammaString += "1";
    }
    else {
        epsilonString += "1";
        gammaString += "0";
    }
    ones = 0;
    zeros = 0;
}
//convert to decimal
const gamma = parseInt(gammaString, 2);
const epsilon = parseInt(epsilonString, 2);
console.log(gamma * epsilon)

