export default function arrayContains<T>(
  arr: T[],
  val: T,
  start: number = 0,
  end: number = arr.length
): boolean {
  for (let i = start; i < end; i++) {
    if (arr[i] == val) {
      return true;
    }
  }
  return false;
}
