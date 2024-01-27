type UnicodeData = Map<number, UnicodeCharInfo>;

type FilterData =
	| { type: 'character'; value: RegExp }
	| { type: 'name'; value: RegExp | string }
	| { type: 'range'; value: [number, number] }
	| { type: 'bidi'; value: BidiClass };

export type Filter = FilterData & { negated?: boolean };

export type UnicodeData = Map<number, UnicodeCharInfo>;

export type BidiClass =
	| 'L'
	| 'R'
	| 'AL'
	| 'EN'
	| 'ES'
	| 'ET'
	| 'AN'
	| 'CS'
	| 'NSM'
	| 'BN'
	| 'B'
	| 'S'
	| 'WS'
	| 'ON'
	| 'LRE'
	| 'LRO'
	| 'RLE'
	| 'RLO'
	| 'PDF'
	| 'LRI'
	| 'RLI'
	| 'FSI'
	| 'PDI';

export interface UnicodeCharInfo {
	codepoint: number;
	name: string;
	category: string;
	combiningClass: number;
	bidiClass: BidiClass;
	decomposition: {
		type: string;
		codepoints: number[];
	} | null;
	numberEquivalent: {
		decimal: number | null;
		digit: number | null;
		numeric: string | null;
	};
	isBidiMirrored: boolean;
	caseMapping: {
		uppercase: number | null;
		lowercase: number | null;
		titlecase: number | null;
	};
	htmlEntityNames: string[];
	oldName: string | null;
}

export type WorkerMessage =
	| { name: 'loadTable'; id: string }
	| { name: 'query'; id: string; payload: BoxSet[] }
	| { name: 'simple-query'; id: string; payload: string }
	| { name: 'advanced-query'; id: string; payload: Filter[] };

type RemoveId<T> = T extends { id: any } ? { [K in Exclude<keyof T, 'id'>]: T[K] } : T;
export type WorkerMessageWithoutId = RemoveId<WorkerMessage>;

export type WorkerMessageResponse =
	| {
			unicodeDataMap: Map<number, UnicodeCharInfo>;
	  }
	| [number, UnicodeCharInfo][]
	| void;

type WorkerResponseFromMessageName<T extends WorkerMessage['name']> = T extends 'loadTable'
	? { unicodeDataMap: Map<number, UnicodeCharInfo> }
	: [number, UnicodeCharInfo][];
export type WorkerResponseFromMessage<T extends WorkerMessage | WorkerMessageWithoutId> = WorkerResponseFromMessageName<
	T['name']
>;
