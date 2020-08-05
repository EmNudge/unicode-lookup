import { split, filter, pipe } from '../utils/iterable'

// This gets AND sets local unicode maps
export default async function getUnicode() {
  // this is a massive file - over 33k lines
  const res = await fetch('/DerivedName.txt');
  const text = await res.text();

  const unicodeMap: Map<number, string> = new Map();
  const unicodeRangesMap: Map<number[], string> = new Map();

  const lines = pipe(
    split('\n'),
    filter(line => !line.startsWith('#') && line.trim().length)
  )(text);

  for (const line of lines) {
    const parsed = parseDerivedNameLine(line);

    if (parsed.range) {
      const { range, name } = parsed;
      unicodeRangesMap.set(range, name);
      continue;
    }

    const { codePoint, name } = parsed;
    unicodeMap.set(codePoint, name);
  }

  return {
    unicodeMap,
    unicodeRangesMap,
  };
}

function parseDerivedNameLine(line: string) {
  const [hex, n] = line.split(';');
  
  if (!n) console.log(line)
  // There is some space padding. We don't need to .trim() the hex
  // since parseInt doesn't care about spaces after the hex 
  const name = n.trim();

  // This is a range
  if (hex.includes('..')) {
    const [start, end] = hex.split('..');

    return {
      range: [parseInt(start, 16), parseInt(end, 16)],
      name
    };
  }

  const codePoint = parseInt(hex, 16);
  return { codePoint, name };
}