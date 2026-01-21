export function getCodepoint(num: number) {
	const str = num.toString(16).toLowerCase().padStart(4, '0');
	return `U+${str}`;
}

export function getEncodings(codepoint: number) {
	const char = String.fromCodePoint(codepoint);
	const utf16BE =
		codepoint > 0xffff
			? new Uint16Array(2).map((_, i) => char.charCodeAt(i))
			: Uint16Array.from([codepoint]);
	// UTF-16 LE swaps the bytes within each 16-bit code unit
	const utf16LE = utf16BE.map((unit) => ((unit & 0xff) << 8) | ((unit >> 8) & 0xff));
	return {
		utf8: new TextEncoder().encode(char),
		utf16BE,
		utf16LE
	};
}
