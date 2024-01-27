import type { Box } from '../stores/advancedSearch';

export function getBoxSetsFromText(text: string): Box[] {
    return [getQueryFromText(text)];
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
    // allow ranges of codepoints using '-' as a separator
    const range = getNumRangeFromText(text);
    if (range) {
        return {
            name: 'Codepoint Range',
            data: { from: range[0], to: range[1] },
            matchType: 'Require',
        }
    }

    const globRegex = getRegexFromGlob(text.trim());
    if (globRegex) {
        return {
            name: 'Regex Match',
            data: {
                regex: globRegex,
                matchOn: 'Name',
            },
            matchType: 'Require',
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
            },
            matchType: 'Require',
        };
    }

    return {
        name: 'Name Includes',
        data: text,
        matchType: 'Require',
    };
}