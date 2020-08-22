// this is a regex category builder
import { binary, categories } from '../unicode.json';

export { scripts } from '../unicode.json';
export const props = [...binary, ...categories].sort();

export enum Types {
  EXCLUDED = 0,
	INCLUDED = 1,
}

export class RegexBuilder {
  _regex: string[];

  constructor() {
    // array of strings
    this._regex = [];
  }

  _add(category: string, mustExist = true) {
    const symbol = mustExist ? '=' : '!';
    this._regex.push(`(?${symbol}\p{${category}})`);
  }

  // method assumed valid category
  is(category: string) {
    this._add(category, true);
    return this;
  }

  not(category: string) {
    this._add(category, false);
    return this;
  }

  regex() {
    return new RegExp(this._regex.join())
  }

  getRaw() {
    return this._regex;
  }
}