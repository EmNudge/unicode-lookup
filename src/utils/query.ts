import type { Box, BoxSet } from '../stores/advancedSearch';
import { BoxSetType } from '../stores/advancedSearch';

export function getBoxSetsFromText(text: string): BoxSet[] {
    const box = getQueryFromText(text);
    const query = {
        type: BoxSetType.Require,
        boxes: [box]
    };

    return [query];
}

function getNumFromText(text: string): number | null {
    if (/^[0-9]+$/.test(text)) return Number(text);
    if (/^(?:0x|U\+)[0-9a-f]+$/i.test(text)) return parseInt(text.slice(2), 16);
    if (/^0b[10]+$/.test(text)) return parseInt(text.slice(2), 2);
    
    return null;
}

function getNumRangeFromText(text: string): [number, number] | null {
    const numStrings = text.split('-');
    if (numStrings.length !== 2) return null;

    const n1 = getNumFromText(numStrings[0].trim());
    if (!n1) return null;
    const n2 = getNumFromText(numStrings[1].trim());
    if (!n2) return null;

    return [n1, n2];
}
function getRegexFromGlob(text: string): RegExp | null {
    if (!text.includes('*')) return null;
    if (!/^[a-zA-Z-* ]+$/.test(text)) return null;

    const regexText = text.replace(/\*/g, '.*');
    return new RegExp(regexText, 'i');
}

export function getQueryFromText(text: string): Box {
    const num = getNumFromText(text);
    if (num !== null) {
        const char = String.fromCodePoint(num);
        return { 
            name: 'Is Near Char',
            data: { char, distance: 0 }
        };
    }

    if ([...text].length === 1) {
        return { 
            name: 'Is Near Char',
            data: { char: text, distance: 0 }
        };
    }

    // allow ranges of codepoints using '-' as a separater
    const range = getNumRangeFromText(text);
    if (range) {
        return {
            name: 'Codepoint Range',
            data: { from: range[0], to: range[1] },
        }
    }

    const globRegex = getRegexFromGlob(text.trim());
    if (globRegex) {
        return {
            name: 'Regex Match',
            data: {
                regex: globRegex,
                matchOn: 'Name',
            }
        }
    }

    const regexRes = text.match(/\/(.+?)\/([a-z]+)?/);
    if (regexRes) {
        const { 1: regex, 2: flagsStr } = regexRes;
        const flags = /i/i.test(flagsStr) ? 'ui' : 'u';
        return { 
            name: 'Regex Match',
            data: { 
                regex: new RegExp(regex, flags), 
                matchOn: 'Character'
            }
        };
    }

    return {
        name: 'Name Includes',
        data: text
    };
}