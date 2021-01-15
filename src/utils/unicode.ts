// https://tc39.es/ecma262/#table-nonbinary-unicode-properties
import { append, filter, map, collect, pipe } from './iterable.js';
import type { Block } from '../stores';

export const valueAliases = ["Cased_Letter","Close_Punctuation","Connector_Punctuation","Control","Currency_Symbol","Dash_Punctuation","Decimal_Number","Enclosing_Mark","Final_Punctuation","Format","Initial_Punctuation","Letter","Letter_Number","Line_Separator","Lowercase_Letter","Mark","Math_Symbol","Modifier_Letter","Modifier_Symbol","Nonspacing_Mark","Number","Open_Punctuation","Other","Other_Letter","Other_Number","Other_Punctuation","Other_Symbol","Paragraph_Separator","Private_Use","Punctuation","Separator","Space_Separator","Spacing_Mark","Surrogate","Symbol","Titlecase_Letter","Unassigned","Uppercase_Letter"];

export const scripts = ["Adlam","Ahom","Anatolian_Hieroglyphs","Arabic","Armenian","Avestan","Balinese","Bamum","Bassa_Vah","Batak","Bengali","Bhaiksuki","Bopomofo","Brahmi","Braille","Buginese","Buhid","Canadian_Aboriginal","Carian","Caucasian_Albanian","Chakma","Cham","Chorasmian","Cherokee","Common","Coptic","Cuneiform","Cypriot","Cyrillic","Deseret","Devanagari","Dives_Akuru","Dogra","Duployan","Egyptian_Hieroglyphs","Elbasan","Elymaic","Ethiopic","Georgian","Glagolitic","Gothic","Grantha","Greek","Gujarati","Gunjala_Gondi","Gurmukhi","Han","Hangul","Hanifi_Rohingya","Hanunoo","Hatran","Hebrew","Hiragana","Imperial_Aramaic","Inherited","Inscriptional_Pahlavi","Inscriptional_Parthian","Javanese","Kaithi","Kannada","Katakana","Kayah_Li","Kharoshthi","Khitan_Small_Script","Khmer","Khojki","Khudawadi","Lao","Latin","Lepcha","Limbu","Linear_A","Linear_B","Lisu","Lycian","Lydian","Mahajani","Makasar","Malayalam","Mandaic","Manichaean","Marchen","Medefaidrin","Masaram_Gondi","Meetei_Mayek","Mende_Kikakui","Meroitic_Cursive","Meroitic_Hieroglyphs","Miao","Modi","Mongolian","Mro","Multani","Myanmar","Nabataean","Nandinagari","New_Tai_Lue","Newa","Nko","Nushu","Nyiakeng_Puachue_Hmong","Ogham","Ol_Chiki","Old_Hungarian","Old_Italic","Old_North_Arabian","Old_Permic","Old_Persian","Old_Sogdian","Old_South_Arabian","Old_Turkic","Oriya","Osage","Osmanya","Pahawh_Hmong","Palmyrene","Pau_Cin_Hau","Phags_Pa","Phoenician","Psalter_Pahlavi","Rejang","Runic","Samaritan","Saurashtra","Sharada","Shavian","Siddham","SignWriting","Sinhala","Sogdian","Sora_Sompeng","Soyombo","Sundanese","Syloti_Nagri","Syriac","Tagalog","Tagbanwa","Tai_Le","Tai_Tham","Tai_Viet","Takri","Tamil","Tangut","Telugu","Thaana","Thai","Tibetan","Tifinagh","Tirhuta","Ugaritic","Vai","Wancho","Warang_Citi","Yezidi","Yi","Zanabazar_Square"];

export const binaryProperties = ["ASCII","ASCII_Hex_Digit","Alphabetic","Any","Assigned","Bidi_Control","Bidi_Mirrored","Case_Ignorable","Cased","Changes_When_Casefolded","Changes_When_Casemapped","Changes_When_Lowercased","Changes_When_NFKC_Casefolded","Changes_When_Titlecased","Changes_When_Uppercased","Dash","Default_Ignorable_Code_Point","Deprecated","Diacritic","Emoji","Emoji_Component","Emoji_Modifier","Emoji_Modifier_Base","Emoji_Presentation","Extended_Pictographic","Extender","Grapheme_Base","Grapheme_Extend","Hex_Digit","IDS_Binary_Operator","IDS_Trinary_Operator","ID_Continue","ID_Start","Ideographic","Join_Control","Logical_Order_Exception","Lowercase","Math","Noncharacter_Code_Point","Pattern_Syntax","Pattern_White_Space","Quotation_Mark","Radical","Regional_Indicator","Sentence_Terminal","Soft_Dotted","Terminal_Punctuation","Unified_Ideograph","Uppercase","Variation_Selector","White_Space","XID_Continue","XID_Start"];

export const properties = [...valueAliases, ...binaryProperties, 'Script'].sort();

const allRegex = pipe(
  filter(prop => prop !== 'Script'),
  append(map(script => `Script=${script}`)(scripts)),
  map(property => {
    const regexStr = String.raw`^\p{${property}}$`;
    const regex = new RegExp(regexStr, 'u');
    return [property, regex];
  }),
  collect
)(properties);

export function getPropertiesForChar(char: string) {
	if ([...char].length > 1) throw new Error('Cannot match on string with length over 1');
  
	return pipe(
    filter(([,regex]) => regex.test(char)),
		map(([property]) => property),
		collect
  )(allRegex);
}

const PLANE_LENGTH = 2**16;
export enum PlaneName {
  BasicMultilingual = 'Basic Multilingual Plane',
  SupplementaryMultilingual = 'Supplementary Multilingual Plane',
  SupplementaryIdeographic = 'Supplementary Ideographic Plane',
  TertiaryIdeographic = 'Tertiary Ideographic Plane',
  SupplementarySpecialPurpose = 'Supplementary Special-purpose Plane',
  SupplementaryPrivateUseArea = 'Supplementary Private Use Area Plane',
};

export const PlaneMap = new Map<number, PlaneName>([
  [0, PlaneName.BasicMultilingual],
  [1, PlaneName.SupplementaryMultilingual],
  [2, PlaneName.SupplementaryIdeographic],
  [3, PlaneName.TertiaryIdeographic],
  [14, PlaneName.SupplementarySpecialPurpose],
  [15, PlaneName.SupplementaryPrivateUseArea],
  [16, PlaneName.SupplementaryPrivateUseArea],
]);

export type Plane = { 
  number: number, 
  name?: PlaneName;
};
export function getPlaneForChar(char: string): Plane {
  if ([...char].length > 1) throw new Error('Cannot get plane on string with length over 1');

  const codepoint = char.codePointAt(0);
  const plane = Math.floor(codepoint / PLANE_LENGTH);

  if (PlaneMap.has(plane)) {
    return { number: plane, name: PlaneMap.get(plane) };
  }
  
  return { number: plane };
}

export function parseBlocks(textFile: string): Block[] {
  return textFile.split('\n').map(row => {
    const [rangeStr, name] = row.split(',');
    const range = rangeStr.split('..').map(str => parseInt(str.slice(2), 16)) as [number, number];
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