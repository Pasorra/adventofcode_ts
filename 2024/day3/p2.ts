import { readFileLines } from "../../utils/FileReader";
const lines = readFileLines(import.meta.url);

let res = 0;
const arr = "mul(,)";
let enabled = true;

const clg = console.log;
console.log = () => {};

for (const line of lines) {
  for (let i = 0; i < line.length; i++) {
    let left = 0;
    let right = 0;
    let arrI = 0;
    let broke = false;

    // check if we should be enabled or not
    if (enabled && i + 7 < line.length) {
      enabled = line.slice(i, i + 7) !== "don't()";
      if (!enabled) {
        i += 6; // account for i++ at top
      }
    } else if (i + 4 < line.length) {
      enabled = line.slice(i, i + 4) === "do()";
      if (enabled) {
        i += 3;
      }
    }

    if (enabled) {
      let j = i;
      for (; arrI < arr.length && j < line.length; arrI++, j++) {
        // check if number when we are behind or ahead of a comma
        if ((arrI === 4 || arrI === 5) && !Number.isNaN(+line[j])) {
          if (arrI === 4) {
            left *= 10;
            left += +line[j];
          } else {
            right *= 10;
            right += +line[j];
          }
          arrI--;
        } else if (line[j] !== arr[arrI]) {
          // check if doesn't match format mul(...,...)
          broke = true;
          break;
        }
      }
      if (!broke) {
        res += left * right;
        j--;
      }
      i = j;
    }
  }
}

console.log = clg;
console.log(res);
