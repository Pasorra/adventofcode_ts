import { readFileLines } from "../../utils/FileReader";
import arrayContains from "../../utils/utils";
const lines = readFileLines(import.meta.url);

let isParsingRules = true;
let rules: { [key: number]: number[] } = {};
let updates: number[][] = [];
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.trim() === "") {
    isParsingRules = false;
    continue;
  }

  if (isParsingRules) {
    const lr = line.split("|");
    if (rules[+lr[0]] === undefined) {
      rules[+lr[0]] = [+lr[1]];
    }
    rules[+lr[0]].push(+lr[1]);
  } else {
    updates.push(line.split(",").map(Number));
  }
}

const checkUpdate = (update: number[]): number => {
  for (let i = 0; i < update.length; i++) {
    const v = update[i];
    if (rules[v] !== undefined) {
      for (const ruleValue of rules[v]) {
        if (arrayContains(update, ruleValue, 0, i)) {
          return 0;
        }
      }
    }
  }
  return update[Math.floor(update.length / 2)];
};

let res = 0;
for (const update of updates) {
  res += checkUpdate(update);
}
console.log(res);
