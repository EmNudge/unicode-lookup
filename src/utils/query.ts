import { getIterArr } from './iterableObj';
import { currentQueryStore } from './../stores';

type QueryType = 'string' | 'number' | 'regex';

export const queries = {
    'number': (value: any) => `([num]) => Math.abs(${value} - num) < 25`,
    'string': (value: any) => `([,name]) => name.includes("${value.toUpperCase()}")`,
    'regex': (value: any) => `([num]) => ${value}.test(String.fromCodePoint(num))`
}

export const autoQuery = (text: string, limit: number = 50) => {
    const { type, value } = getPayload(text);
    const funcText = queries[type](value);
    const filterFunc = { type: 'FUNCTION', value: `return ${funcText}` };
    const queryArr = [
        getIterArr('filter', [filterFunc]),
        getIterArr('take', [limit]),
    ];

    currentQueryStore.set(queryArr);
}

// takes text, parses it and returns type
type Payload = { type: QueryType, value: number | string | RegExp };
export const getPayload = (text: string): Payload => {
    // if decimal number
    if (/^[0-9]+$/.test(text)) {
        return { 
            type: 'number', 
            value: Number(text),
        };
    }
    
    // if hexidecimal number
    if (/^0x[0-9a-fA-F]+$/.test(text)) {
        return { 
            type: 'number', 
            value: parseInt(text, 16),
        };
    }

    // if single char, get its codepoint
    if ([...text].length === 1) {
        return { 
            type: 'number', 
            value: text.codePointAt(0),
        };
    }

    // if regex, retrieve it, but always include flag u. Only add i if requested
    // the other flags don't matter in this context
    const regexRes = text.match(/\/(.+?)\/([a-z]+)?/);
    if (regexRes) {
        const { 1: regStr, 2: flags } = regexRes;
        const caseInsensitive = flags && flags.includes('i');
        return {
            type: 'regex',
            value: new RegExp(regStr, caseInsensitive ? 'ui' : 'u'),
        }
    }

    // must just be a description
    return {
        type: 'string',
        value: text
    }
};