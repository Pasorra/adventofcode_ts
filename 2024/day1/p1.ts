import { readFileLines } from "../../utils/FileReader";
const lines = readFileLines(import.meta.url);

const left: number[] = [];
const right: number[] = [];

lines.forEach((element) => {
  const lr = element.split("   ");
  left.push(+lr[0]);
  right.push(+lr[1]);
});

left.sort((a, b) => a - b);
right.sort((a, b) => a - b);

let res = 0;

for (let i = 0; i < lines.length; i++) {
  let v = +left[i] - +right[i];
  v = v < 0 ? -v : v;
  res += v;
}

console.log(res);
