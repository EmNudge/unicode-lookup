export function debounce(func: Function, ms: number) {
  let timeoutId: number;

  return function newFunc(...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(func, ms, ...args);
  }
}