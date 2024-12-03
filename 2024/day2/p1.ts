import { readFileLines } from "../../utils/FileReader";
const reports = readFileLines(import.meta.url);

let safe = 0;

for (const report of reports) {
  let increasing: boolean | null = null;
  let completed = true;
  const levels = report.split(" ").map(Number);

  for (let i = 0; i < levels.length - 1; i++) {
    const curr = levels[i];
    const next = levels[i + 1];
    const diff = Math.abs(curr - next);

    if (!(1 <= diff && diff <= 3)) {
      completed = false;
      break;
    }

    if (increasing === null) {
      increasing = next > curr ? true : false;
    } else if (increasing !== next > curr) {
      completed = false;
      break;
    }
  }

  if (completed) {
    safe++;
  }
}

console.log(safe);
