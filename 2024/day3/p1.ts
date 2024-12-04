import { readFileLines } from "../../utils/FileReader";
const lines = readFileLines(import.meta.url);

const regex = /mul\(\d*,\d*\)/g;

let res = 0;

for (const line of lines) {
  const match = line.match(regex);
  if (match) {
    for (let r of match) {
      const lr = r.slice(4).slice(0, -1).split(",");
      res += +lr[0] * +lr[1];
    }
  }
}
console.log(res);
