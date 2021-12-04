const fs = require("fs");
const initialDiagnostics = fs.readFileSync("./input.txt", "utf-8").split("\n");
const bitLength = initialDiagnostics[0].length;
let oxygen = 0;
let co2 = 0;
let diagnostics = initialDiagnostics;

const calculateOnesAndZeros = (position, diagnostics) => {
    let ones = 0;
    let zeros = 0;
    for (let row in diagnostics) {
        const diagnostic = diagnostics[row];
        const value = diagnostic[position];
        value === "0" ? zeros++ : ones++;
    }
    return { ones, zeros };
}

for (let column = 0; column < bitLength; column++) {
    const { ones, zeros } = calculateOnesAndZeros(column, diagnostics);
    diagnostics = ones >= zeros
        ? diagnostics.filter(d => d[column] === "1")
        : diagnostics.filter(d => d[column] === "0");
    
    if (diagnostics.length === 1) {
        oxygen = parseInt(diagnostics[0], 2)
        break;
    }
}

diagnostics = initialDiagnostics;

for (let column = 0; column < bitLength; column++) {
    const { ones, zeros } = calculateOnesAndZeros(column, diagnostics);
    diagnostics = zeros <= ones
        ? diagnostics.filter(d => d[column] === "0")
        : diagnostics.filter(d => d[column] === "1");
    
    if (diagnostics.length === 1) {
        co2 = parseInt(diagnostics[0], 2)
        break;
    }
}
console.log(oxygen * co2)