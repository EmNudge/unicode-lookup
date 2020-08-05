// this is a regex category builder
// it specifically exists due to how difficult it is to check if a char falls under many categories
export const categories = [
  'Hex_Digit',
  'Join_Control',
  'Alphabetic',
  'Lowercase',
  'Uppercase',
  'ID_Start',
  'ID_Continue',
  'Variation_Selector',
  'White_Space',
]

export class RegexBuilder {
  constructor() {
    // array of strings
    this._regex = [];
  }

  _add(category, mustExist = true) {
    const symbol = mustExist ? '=' : '!';
    this._regex.push(`(?${symbol}\p{${category}})`);
  }

  // method assumed valid category
  is(category) {
    this._add(category, true);
    return this;
  }

  not(category) {
    this._add(category, false);
    return this;
  }

  regex() {
    return new RegExp(this.regex.join())
  }

  getRaw() {
    return this._regex;
  }
}