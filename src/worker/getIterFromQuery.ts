import { BoxSetType } from '$stores';
import type { BoxSet, Box } from '$stores';
import { PLANE_LENGTH } from '$utils/unicode';
import { unicodeBlocksMap } from './index';
import type { UnicodeCharInfo } from './retrieval';

export function* getIter(boxSets: BoxSet[], unicodeMap: Map<number, UnicodeCharInfo>) {
  for (const unicode of unicodeMap) {
    const shouldYield = shouldYieldCodepoint(boxSets, unicode);
    if (shouldYield) yield unicode;
  }
}

function shouldYieldCodepoint(boxSets: BoxSet[], unicode: [number, UnicodeCharInfo]) {
  for (const boxSet of boxSets) {
    const { boxes, type } = boxSet;
    const matches = matchesBoxes(boxes, unicode);
    
    if (!matches && type === BoxSetType.Require) return false;
    if (matches && type === BoxSetType.Exclude) return false;
  }

  return true;
}

const numInRange = (num: number, range: [number, number]) =>
  range[0] <= num && num <= range[1];

type BoxMatcher = (unicodeInfo: UnicodeCharInfo, data: Box["data"]) => boolean;
const boxMatcherMap = new Map<string, BoxMatcher>([
  [
    'Codepoint Range', 
    (unicodeInfo: UnicodeCharInfo, data: { from: number, to: number }) => 
      numInRange(unicodeInfo.codepoint, [data.from, data.to])
  ],
  [
    'Unicode Plane', 
    (unicodeInfo: UnicodeCharInfo, data: number) =>
      numInRange(unicodeInfo.codepoint, [PLANE_LENGTH * data, PLANE_LENGTH * data + PLANE_LENGTH]),
  ],
  [
    'Is Near Char', 
    (unicodeInfo: UnicodeCharInfo, { char, distance }: { char: string, distance: number }) =>
      Math.abs(char.codePointAt(0)! - unicodeInfo.codepoint) <= distance
  ],
  [
    'Name Includes', 
    (unicodeInfo: UnicodeCharInfo, data: string) => 
      unicodeInfo.name.toLowerCase().includes(data.toLowerCase())
  ],
  [
    'Unicode Property',
    (unicodeInfo: UnicodeCharInfo, data: string) => {
      const regex = new RegExp(`\\p{${data}}`, 'u');
      return regex.test(String.fromCodePoint(unicodeInfo.codepoint));
    }
  ],
  [
    'Regex Match',
    (unicodeInfo: UnicodeCharInfo, { regex, matchOn }: { regex: RegExp, matchOn: 'Character' | 'Name'}) => 
      matchOn === 'Character'
        ? regex.test(String.fromCodePoint(unicodeInfo.codepoint))
        : regex.test(unicodeInfo.name)
  ],
  [
    'Unicode Block',
    (unicodeInfo: UnicodeCharInfo, data: string) => 
      numInRange(unicodeInfo.codepoint, unicodeBlocksMap.get(data)!)
  ],
  [
    'Bidi Class',
    (unicodeInfo: UnicodeCharInfo, data: string) => 
      unicodeInfo.bidiClass === data
  ]
]);

function matchesBoxes(boxes: Box[], unicode: [number, UnicodeCharInfo]) {
  const [codepoint, unicodeInfo] = unicode;

  for (const box of boxes) {
    const boxMatcher = boxMatcherMap.get(box.name);
    if (!boxMatcher) {
      throw new Error(`box name of "${box.name}" does not match any boxes supported`);
    }

    const matches = boxMatcher(unicodeInfo, box.data);
    if (matches) return true;
  }

  return false;
}