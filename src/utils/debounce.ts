export function debounce(func: () => void, ms: number) {
  let timeoutId: number;

  return function newFunc() {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(func, ms);
  }
}