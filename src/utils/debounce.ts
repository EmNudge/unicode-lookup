export function debounce(func: (...args: any[]) => void, ms: number) {
	let timeoutId: number;

	return function newFunc(...args2: any[]) {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(func, ms, ...args2);
	};
}
