import { readFileLines } from "../../utils/FileReader";
const lines = readFileLines(import.meta.url);

const dict: { [key: string]: number } = {};

lines.forEach((element) => {
  const lr = element.split("   ");
  dict[lr[1]] = dict[lr[1]] === undefined ? 1 : dict[lr[1]] + 1;
});

let res = 0;
lines.forEach((element) => {
  const lr = element.split("   ");
  if (dict[lr[0]] !== undefined) {
    res += dict[lr[0]] * +lr[0];
  }
});

console.log(res);
