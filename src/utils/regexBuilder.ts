// this is a regex category builder
// it specifically exists due to how difficult it is to check if a char falls under many categories
export enum Categories {
  'Hex_Digit',
  'Alphabetic',
  'Lowercase',
  'Uppercase',
  'Math',
  'ID_Start',
  'ID_Continue',
  'White_Space',
  'Terminal_Punctuation',
  'Join_Control',
  'Variation_Selector',
  'Deprecated',
  'Dash',
  'Diacritic',
  'Extender',
  'Ideographic',
  'IDS_Binary_Operator',
  'IDS_Trinary_Operator',
  'Logical_Order_Exception'
}

export class RegexBuilder {
  _regex: string[];

  constructor() {
    // array of strings
    this._regex = [];
  }

  _add(category: Categories, mustExist = true) {
    const symbol = mustExist ? '=' : '!';
    this._regex.push(`(?${symbol}\p{${category}})`);
  }

  // method assumed valid category
  is(category: Categories) {
    this._add(category, true);
    return this;
  }

  not(category: Categories) {
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