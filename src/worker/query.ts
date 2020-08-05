import { take, filter, pipe, collect, forEach } from '../utils/iterable';

interface QueryOptions {
  limit: number;
}

export default class QueryMachine {
  unicodeMap: Map<number, string>;
  unicodeRangeMap: Map<number[], string>;
  limit: number;

  constructor(unicodeMap: Map<number, string>, unicodeRangeMap: Map<number[], string>, { limit }: QueryOptions) {
    if (!unicodeMap || !unicodeRangeMap) {
      throw new Error('Cannot initialize QueryMachine without unicode maps');
    }

    this.unicodeMap = unicodeMap;
    this.unicodeRangeMap = unicodeRangeMap;
    
    // options (can be undefined/null)
    this.limit = limit;
  }

  query({ type, value }: { type: string, value: any}) {
    const funcs = [];
    let exactMatch: [number, string] | null = null;

    if (type === 'number') {
      const getMatch = ([num, name]: [number, string]) => {
        if (num === value) exactMatch = [num, name];
      }
      funcs.push(forEach(getMatch));

      // collect all "kinda" matches. We want to get surrounding nums, so we split limit in 2
      const closeNum = this.limit ? this.limit / 2 : 20;
      const isClose = ([num]: [number]) => Math.abs(value - num) < closeNum && num !== value;
      funcs.push(filter(isClose));

    } else if (type === 'string') {
      const val = value.toUpperCase();
      
      const getMatch = ([num, name]: [number, string]) => {
        if (name === val) exactMatch = [num, name];
      }
      funcs.push(forEach(getMatch));

      // collect all "kinda" matches
      const hasName = ([,name]: [number, string]) => name.includes(val) && name !== val;
      funcs.push(filter(hasName));
    } else if (type === 'regex') {
      // testing in the order the user most likely meant to
      // first the name, then the char itself
      const passesRegex = ([num]: [number]) => 
        value.test(String.fromCodePoint(num));

      funcs.push(filter(passesRegex));
    }

    if (this.limit > 0) {
      funcs.push(take(this.limit));
    }

    const matches = pipe(
      ...funcs,
      collect
    )(this.unicodeMap);

    return {
      exactMatch,
      matches,
    }
  }
}