export function getCodepoint(num: number) {
	const str = num.toString(16).toLowerCase().padStart(4, '0');
	return 'U+' + str;
}

export function getEncodings(codepoint: number) {
	const char = String.fromCodePoint(codepoint);
	return {
		utf8: new TextEncoder().encode(char),
		utf16:
			codepoint > 0xffff
				? new Uint16Array(2).map((_, i) => char.charCodeAt(i))
				: Uint16Array.from([codepoint]),
		utf32: Uint32Array.from([codepoint]),
	};
}
