import { readFileLines } from "../../utils/FileReader";
import arrayContains from "../../utils/utils";
const lines = readFileLines(import.meta.url);

let isParsingRules = true;
const rules: { [key: number]: number[] } = {};
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

const isValid = (update: number[]): boolean => {
  for (let i = 0; i < update.length; i++) {
    const v = update[i];
    if (rules[v] !== undefined) {
      for (const ruleValue of rules[v]) {
        if (arrayContains(update, ruleValue, 0, i)) {
          return false;
        }
      }
    }
  }
  return true;
};

const dfs = (val: number, dependencyList: number[], oldUpdate: number[]) => {
  for (const v of rules[val]) {
    if (oldUpdate.includes(v) && !dependencyList.includes(v)) {
      dfs(v, dependencyList, oldUpdate);
    }
  }
  dependencyList.push(val);
};

const getOrderedMiddle = (update: number[]): number => {
  const updated: number[] = [];
  for (const v of update) {
    if (rules[v] !== undefined && !updated.includes(v)) {
      dfs(v, updated, update);
      // console.log(`Returned: ${updated}`);
    }
  }
  // console.log(`Updated: ${updated}`);
  return updated[Math.floor(updated.length / 2)];
};

let res = 0;
for (const update of updates) {
  if (!isValid(update)) {
    res += getOrderedMiddle(update);
  }
}
console.log(res);
