const fs = require("fs");
const movements = fs.readFileSync("./input.txt", "utf-8").split("\n");
let aim = 0;
let depth = 0;
let horizontal = 0;

for (let i in movements) {
    const movement = movements[i].split(" ")[0];
    const value = parseInt(movements[i].split(" ")[1]);
    if (movement.startsWith("f")) {
        horizontal += value;
        depth += value * aim;
    }
    else {
        movement.startsWith("u") ? aim -= value : aim += value;
    }
}

console.log(horizontal * depth);
  