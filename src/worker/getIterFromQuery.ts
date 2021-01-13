import { BoxSetType } from '../stores';
import type { BoxSet, Box } from '../stores';

export function* getIter(boxSets: BoxSet[], unicodeMap: Map<number, string>) {
  console.log({ boxSets })
  for (const unicode of unicodeMap) {
    const shouldYield = shouldYieldCodepoint(boxSets, unicode);
    if (shouldYield) yield unicode;
  }
}

function shouldYieldCodepoint(boxSets: BoxSet[], unicode: [number, string]) {
  for (const boxSet of boxSets) {
    const { boxes, type } = boxSet;
    const matches = matchesBoxes(boxes, unicode);
    if (!matches) continue;
    
    if (type === BoxSetType.Require) return true;
    return false;
  }

  return false;
}

function matchesBoxes(boxes: Box[], unicode: [number, string]) {
  for (const box of boxes) {
    if (box.name === 'Codepoint Range') {
      const inRange = box.data.from <= unicode[0] && unicode[0] <= box.data.to;
      if (inRange) return true;
    }
    if (box.name === 'Is Near Char') {
      const { char, distance } = box.data;
      const nearChar = Math.abs(char.codePointAt(0) - unicode[0]) <= distance;
      if (nearChar) return true;
    }
    if (box.name === 'Name Includes') {
      const nameIncludes = unicode[1].toLowerCase().includes(box.data.toLowerCase());
      if (nameIncludes) return true;
    }
    if (box.name === 'Unicode Property') {
      const regex = new RegExp(`\\p{${box.data}}`, 'u');
      const hasProperty = regex.test(String.fromCodePoint(unicode[0]));
      if (hasProperty) return true;
    }
    if (box.name === 'Regex Match') {
      const { regex, matchOn } = box.data;
      const matches = matchOn === 'Character'
        ? regex.test(String.fromCodePoint(unicode[0]))
        : regex.test(unicode[1]);
      if (matches) return true;
    }

    // we have yet to match unicode planes or blocks
  }

  return false;
}