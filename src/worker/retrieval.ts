import type { BidiClass, UnicodeCharInfo } from '$utils/types';
import { parseBlocks } from '../utils/unicode';

// maps a codepoint onto html entity names
let symbolHtmlNamesMap = new Map<number, string[]>();

export async function getUnicodeBlockMap() {
	const res = await fetch('/UnicodeBlocks.txt');
	const text = await res.text();

	const blocks = parseBlocks(text);
	const blocksMap = new Map();
	for (const block of blocks) {
		blocksMap.set(block.name, block.range);
	}

	return blocksMap;
}

export async function getUnicodeMap() {
	if (!symbolHtmlNamesMap.size) {
		symbolHtmlNamesMap = await getSymbolHtmlNamesMap();
	}

	const res = await fetch('/UnicodeData.txt');
	const text = await res.text();

	const unicodeArr: [number, UnicodeCharInfo][] = text
		.split('\n')
		.filter((line) => line.trim())
		.map((line) => getUnicodeData(line))
		.map((data) => [data.codepoint, data]);

	return new Map<number, UnicodeCharInfo>(unicodeArr);
}

export async function getSymbolHtmlNamesMap() {
	const res = await fetch('/SymbolHtmlNames.txt');
	const text = await res.text();

	const symbolNamesMap = text.split('\n').map((line) => {
		const [numStr, names] = line.split(';');
		return [parseInt(numStr, 16), names.split(',')] as [number, string[]];
	});

	return new Map<number, string[]>(symbolNamesMap);
}

function getDecompFromStr(decomp: string) {
	const res = decomp.match(/<([a-zA-Z]+)> ([A-Z0-9 ]+)/);
	if (!res) return null;

	const { 1: type, 2: codepointsStr } = res;
	const codepoints = codepointsStr.split(' ').map((codepoint) => {
		return parseInt(codepoint.trim(), 16);
	});

	return { type, codepoints };
}

export const BidiClassMap = new Map<BidiClass, string>([
	['L', 'Left-to-Right'],
	['R', 'Right-to-Left'],
	['AL', 'Arabic Letter'],
	['EN', 'European Number'],
	['ES', 'European Separator'],
	['ET', 'European Number Terminator'],
	['AN', 'Arabic Number'],
	['CS', 'Common Number Separator'],
	['NSM', 'Nonspacing Mark'],
	['BN', 'Boundary Neutral'],
	['B', 'Paragraph Separator'],
	['S', 'Segment Separator'],
	['WS', 'Whitespace'],
	['ON', 'Other Neutrals'],
	['LRE', 'Left-to-Right Embedding'],
	['LRO', 'Left-to-Right Override'],
	['RLE', 'Right-to-Left Embedding'],
	['RLO', 'Right-to-Left Override'],
	['PDF', 'Pop Directional Format'],
	['LRI', 'Left-to-Right Isolate'],
	['RLI', 'Right-to-Left Isolate'],
	['FSI', 'First Strong Isolate'],
	['PDI', 'Pop Directional Isolate'],
]);

function getUnicodeData(line: string): UnicodeCharInfo {
	const [
		codepointStr,
		label,
		category,
		combiningClass,
		bidiClass,
		decompositionStr,
		decimalEquiv,
		digitEquiv,
		numericEquiv,
		bidiMirrored,
		oldName,
		,
		/* isoComment */ uppercaseMapping,
		lowercaseMapping,
		titlecaseMapping,
	] = line.split(';');

	const codepoint = parseInt(codepointStr, 16);
	const name = label.includes('<') && oldName ? oldName : label;
	const isBidiMirrored = bidiMirrored === 'Y';

	const caseMapping = {
		uppercase: uppercaseMapping ? parseInt(uppercaseMapping, 16) : null,
		lowercase: lowercaseMapping ? parseInt(uppercaseMapping, 16) : null,
		titlecase: titlecaseMapping ? parseInt(uppercaseMapping, 16) : null,
	};
	const numberEquivalent = {
		decimal: decimalEquiv ? Number(decimalEquiv) : null,
		digit: digitEquiv ? Number(digitEquiv) : null,
		numeric: numericEquiv || null,
	};

	const decomposition = getDecompFromStr(decompositionStr);

	return {
		codepoint,
		name,
		category,
		combiningClass: Number(combiningClass),
		bidiClass: bidiClass as BidiClass,
		decomposition,
		numberEquivalent,
		isBidiMirrored,
		caseMapping,
		htmlEntityNames: symbolHtmlNamesMap.get(codepoint) ?? [],
		oldName: oldName || null,
	};
}
