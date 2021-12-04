const fs = require("fs");
const movements = fs.readFileSync("./input.txt", "utf-8").split("\n");

let depth = 0;
let horizontal = 0;

for (let i in movements) {
    const movement = movements[i].split(" ")[0];
    const value = parseInt(movements[i].split(" ")[1]);
    if (movement.startsWith("f")) {
          horizontal+= value
    }
    else {
        movement.startsWith("u") ? depth -= value : depth += value;
    }
}

console.log(depth * horizontal);
