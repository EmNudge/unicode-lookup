import QueryMachine from './query';
import getUnicode from './getUnicode';

// Massive hashmap of all codepoints to their name
let unicodeMap = new Map();
// As not to take up space, we don't expand ranges and instead stick them here
let unicodeRangesMap = new Map();

self.addEventListener('message', async ({ data }) => {
  const { type, id } = data;

  if (type === 'retrieve-table') {
    let payload = { unicodeMap, unicodeRangesMap };

    if (!unicodeMap.size) {
      // this also sets unicode locally
      payload = await getUnicode();
      unicodeMap = payload.unicodeMap;
      unicodeRangesMap = payload.unicodeRangesMap;
    }

    self.postMessage({ type, id, payload, request: data });
    return;
  }

  if (type === 'query') {
    const { limit, type, value } = data.payload;

    const queryMachine = new QueryMachine(unicodeMap, unicodeRangesMap, { limit });
    const payload = queryMachine.query({ type, value });
    
    self.postMessage({ type: 'query', id, payload, request: data });

    return;
  }
});


// UnicodeData parsing, if need be in the future

// abstracting some stuff because of how much there is to parse
// http://unicode.org/reports/tr44/#UnicodeData.txt
// Not sure how to implement this, but here is the chart of category names:
// http://unicode.org/reports/tr44/#General_Category_Values
function parseLine(line) {
  const [
    hex, name, category, combiningClass, bidiClass, 
    decomp, numDec, numDigit, numNumeric, bidiMirrrored,,, // skipping 2 obsolete properties
    uppercase, lowercase, titlecase
  ] = line.split(';');
  return {
    codePoint: parseInt(hex, 16),
    name,
    category,
    // unfinished
  }
}