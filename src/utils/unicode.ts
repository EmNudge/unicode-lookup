// https://tc39.es/ecma262/#table-nonbinary-unicode-properties
import type { Block } from '../stores';
import { FULL_SCRIPTS, binaryProperties, valueAliases } from './unicodeData';

// As of 2/4/2020, Safari doesn't support a bunch of them unfortunately
// this is an easy way to filter out bad scripts for any browser
export const scripts = FULL_SCRIPTS.filter((script) => {
	const str = String.raw`^\p{Script=${script}}$`;
	try {
		new RegExp(str, 'u');
	} catch (e) {
		return false;
	}
	return true;
});

export const properties = [
	...valueAliases,
	...binaryProperties,
	'Script',
].sort();

const allRegex = [
	...valueAliases,
	...binaryProperties,
	...scripts.map((script) => `Script=${script}`),
].map((property) => {
	const regexStr = String.raw`^\p{${property}}$`;
	const regex = new RegExp(regexStr, 'u');
	return [property, regex] as const;
});

export function getPropertiesForChar(char: string) {
	if ([...char].length > 1)
		throw new Error('Cannot match on string with length over 1');

	return allRegex
		.filter(([, regex]) => regex.test(char))
		.map(([property]) => property);
}

export const PLANE_LENGTH = 2 ** 16;
export enum PlaneName {
	BasicMultilingual = 'Basic Multilingual Plane',
	SupplementaryMultilingual = 'Supplementary Multilingual Plane',
	SupplementaryIdeographic = 'Supplementary Ideographic Plane',
	TertiaryIdeographic = 'Tertiary Ideographic Plane',
	SupplementarySpecialPurpose = 'Supplementary Special-purpose Plane',
	SupplementaryPrivateUseArea = 'Supplementary Private Use Area Plane',
}

export const planeMap = new Map<number, PlaneName>([
	[0, PlaneName.BasicMultilingual],
	[1, PlaneName.SupplementaryMultilingual],
	[2, PlaneName.SupplementaryIdeographic],
	[3, PlaneName.TertiaryIdeographic],
	[14, PlaneName.SupplementarySpecialPurpose],
	[15, PlaneName.SupplementaryPrivateUseArea],
	[16, PlaneName.SupplementaryPrivateUseArea],
]);

export type Plane = {
	number: number;
	name?: PlaneName;
};
export function getPlaneForCodepoint(codepoint: number): Plane {
	const plane = Math.floor(codepoint / PLANE_LENGTH);

	if (planeMap.has(plane)) {
		return { number: plane, name: planeMap.get(plane) };
	}

	return { number: plane };
}

export function parseBlocks(textFile: string): Block[] {
	return textFile.split('\n').map((row) => {
		const [rangeStr, name] = row.split(',');
		const range = rangeStr
			.split('..')
			.map((str) => parseInt(str.slice(2), 16)) as [number, number];
		return { range, name };
	});
}

export function getCodepointBlock(blocks: Block[], codepoint: number) {
	for (const block of blocks) {
		const { range, name } = block;
		if (codepoint > range[1]) continue;

		return { range: [...range], name };
	}

	throw new Error('codepoint does not match any block');
}

export enum Category {
	// Letters
	Lu = 'Uppercase_Letter',
	Ll = 'Lowercase_Letter',
	Lt = 'Titlecase_Letter',
	LC = 'Cased_Letter',
	Lm = 'Modifier_Letter',
	Lo = 'Other_Letter',

	// Mark
	Mn = 'Nonspacing_Mark',
	Mc = 'Spacing_Mark',
	Me = 'Enclosing_Mark',

	// Number
	Nd = 'Decimal_Number',
	Nl = 'Letter_Number',
	No = 'Other_Number',

	// Punctuation
	Pc = 'Connector_Punctuation',
	Pd = 'Dash_Punctuation',
	Ps = 'Open_Punctuation',
	Pe = 'Close_Punctuation',
	Pi = 'Initial_Punctuation',
	Pf = 'Final_Punctuation',
	Po = 'Other_Punctuation',

	// Symbol
	Sm = 'Math_Symbol',
	Sc = 'Currency_Symbol',
	Sk = 'Modifier_Symbol',
	So = 'Other_Symbol',

	// Separator
	Zs = 'Space_Separator',
	Zl = 'Line_Separator',
	Zp = 'Paragraph_Separator',

	// Other
	Cc = 'Control',
	Cf = 'Format',
	Cs = 'Surrogate',
	Co = 'Private_Use',
	Cn = 'Unassigned',
}
