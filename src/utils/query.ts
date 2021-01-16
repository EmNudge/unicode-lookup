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

function getNumFromText(text: string): number {
    if (/^[0-9]+$/.test(text)) return Number(text);
    if (/^0x[0-9a-fA-F]+$/.test(text)) return Number(text);
    if (/^0b[10]+$/.test(text)) return parseInt(text.slice(2), 16);
    return null;
}

export function getQueryFromText(text: string): Box {
    const num = getNumFromText(text);
    if (typeof num === "number") {
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