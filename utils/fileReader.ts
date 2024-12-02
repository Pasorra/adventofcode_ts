import fs from "fs";

export function readFileLines(url: string): string[] {
  const data: string = fs.readFileSync(new URL("input.txt", url)).toString();
  return data.split(/\r?\n/);
}
