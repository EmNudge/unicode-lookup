import { workerStore } from '../stores';
import { get } from 'svelte/store';
import { getID } from './rand';

// query that returns a promise that only resolves once its specific request resolves
export const query = async (text: string, limit = 50) => {
    const payload = {
        ...getPayload(text),
        limit,
    };

    return await asyncPost({ type: 'query', payload });
};

// chars are cached, so no problem with loading multiple times
export const loadChars = async () => await asyncPost({ type: 'retrieve-table' });

// post to worker asynchonously. Removes listener after getting a response.
export const asyncPost = (data: any) => new Promise(res => {
    const worker = get(workerStore);
    const id = getID();
    worker.postMessage({ ...data, id });

    const func = ({ data }: { data: any }) => {
        if (data.id !== id) return;

        res(data);

        worker.removeEventListener('message', func);
    };

    worker.addEventListener('message', func);
});

// takes text, parses it and returns type
export const getPayload = (text: string) => {
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