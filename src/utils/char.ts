type CodepointNum = "hex" | "oct" | "dec";
export function getNum(num: number, type?: CodepointNum) {
  if (type === 'hex') return `0x${num.toString(16).toLowerCase().padStart(4, '0')}`;
  if (type === 'oct') return `0${num.toString(8).padStart(4, '0')}`;
  return String(num);
}

export function getEncodings(codepoint: number) {
  const char = String.fromCodePoint(codepoint);
  return {
    utf8: new TextEncoder().encode(char),
    utf16: codepoint > 0xffff 
      ? new Uint16Array(2).map((_,i) => char.charCodeAt(i))
      : Uint16Array.from([codepoint]),
    utf32: Uint32Array.from([codepoint]),
  }
}