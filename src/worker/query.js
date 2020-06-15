import { take, filter, pipe, collect, pass } from '../utils/iterable';

export default class QueryMachine {
  constructor(unicodeMap, unicodeRangeMap, { limit }) {
    if (!unicodeMap || !unicodeRangeMap) {
      throw new Error('Cannot initialize QueryMachine without unicode maps');
    }

    this.unicodeMap = unicodeMap;
    this.unicodeRangeMap = unicodeRangeMap;
    
    // options (can be undefined/null)
    this.limit = limit;
  }

  query({ type, value, exact = false }) {
    if (type === 'number' && exact) {
      return this.exactQuery(value);
    }

    return this.iteratorQuery({ type, value });
  }

  // Exact query that we can only use numbers for
  exactQuery(num) {
    const isRegHex = this.unicodeMap.has(num);
    if (isRegHex) {
      return this.unicodeMap.get(num);
    }

    for (const [[start, end], name] of this.unicodeRangeMap) {
      if (num < start || num > end) continue;
      // chop off asterisk and replace with hex
      return name.slice(0, -1) + num.toString(16);
    }

    return null;
  }

  // This is a slower method which checks for non-exact matches. 
  // It's required for strings, but for numbers it can give us the nums around it
  iteratorQuery({ type, value }) {
    let filterFunc = () => false;

    if (type === 'number') {
      const closeNum = this.limit ? this.limit / 2 : 3;
      const isClose = ([num]) => Math.abs(value - num) < closeNum;
      filterFunc = isClose;
    } else if (type === 'string') {
      const val = value.toUpperCase();
      const hasName = ([,name]) => name.includes(val);
      filterFunc = hasName;
    }

    return pipe(
      filter(filterFunc),
      this.limit > 0 ? take(this.limit) : pass,
      collect
    )(this.unicodeMap);
  }
}