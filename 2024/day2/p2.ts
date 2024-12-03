import { readFileLines } from "../../utils/FileReader";
const reports = readFileLines(import.meta.url);

let safe = 0;

// returns -1 if is valid, otherwise returns index of problematic element
function isValid(levels: number[], skipIndex: number = -1): number {
  let increasing: boolean | null = null;
  for (let i = 0; i < levels.length - 1; i++) {
    if (i == skipIndex) continue;

    const curr = levels[i];
    const next = levels[i + 1];
    const diff = Math.abs(curr - next);

    if (!(1 <= diff && diff <= 3)) {
      return i;
    }

    if (increasing === null) {
      increasing = next > curr ? true : false;
    } else if (increasing !== next > curr) {
      return i;
    }
  }
  return -1;
}

for (const report of reports) {
  const levels = report.split(" ").map(Number);

  let res = isValid(levels, 0); // edge case where we need to check if removing the first element works, if it does then it should work no matter what, so no need to check without removing the first element
  //edge case: 21 24 21 19 17 14
  //edge case: 32 35 33 32 29 26 25 22

  let completed = res === -1;
  if (res !== -1) {
    completed = isValid(levels, res) === -1 || isValid(levels, res + 1) === -1;
  }

  if (completed) {
    safe++;
  }
}

console.log(safe);
