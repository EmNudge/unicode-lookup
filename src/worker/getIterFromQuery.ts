import { BoxSetType } from '../stores';
import type { BoxSet, Box } from '../stores';
import { PLANE_LENGTH } from '../utils/unicode';
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
  range[0] < num && num < range[1];

function matchesBoxes(boxes: Box[], unicode: [number, UnicodeCharInfo]) {
  const [codepoint, unicodeInfo] = unicode;
  const { name } = unicodeInfo;

  for (const box of boxes) {
    // for Okku:
  /*} else*/if(box.name === 'Codepoint Range') {
      const { from, to } = box.data;
      if (numInRange(codepoint, [from, to])) return true;
    } else if (box.name === 'Unicode Plane') {
      const from = PLANE_LENGTH * box.data;
      const to = from + PLANE_LENGTH;
      if (numInRange(codepoint, [from, to])) return true;
    } else if (box.name === 'Is Near Char') {
      const { char, distance } = box.data;
      const nearChar = Math.abs(char.codePointAt(0) - codepoint) <= distance;
      if (nearChar) return true;
    } else if (box.name === 'Name Includes') {
      const nameIncludes = name.toLowerCase().includes(box.data.toLowerCase());
      if (nameIncludes) return true;
    } else if (box.name === 'Unicode Property') {
      const regex = new RegExp(`\\p{${box.data}}`, 'u');
      const hasProperty = regex.test(String.fromCodePoint(codepoint));
      if (hasProperty) return true;
    } else if (box.name === 'Regex Match') {
      const { regex, matchOn } = box.data;
      const matches = matchOn === 'Character'
        ? regex.test(String.fromCodePoint(codepoint))
        : regex.test(name);
      if (matches) return true;
    } else if (box.name === 'Unicode Block') {
      const range = unicodeBlocksMap.get(box.data);
      if (numInRange(codepoint, range)) return true;
    }

    // unreachable code (theoretically)
  }

  return false;
}