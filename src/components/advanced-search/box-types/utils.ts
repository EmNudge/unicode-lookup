export function getRegexFromString(text: string) {
  const res = text.match(/^\/(.+)\/([A-Za-z]*)$/);
  if (!res) return null;

  const { 1: regex, 2: flags } = res;
  try {
    return new RegExp(regex, flags);
  } catch(e) {
    return null;
  }
}

export function getStringOrRegex(text: string): string | RegExp | null {
  // names will only ever have a-z
  const isText = /^[A-Za-z ]+$/.test(text);
  if (isText) return text;

  return getRegexFromString(text);
}