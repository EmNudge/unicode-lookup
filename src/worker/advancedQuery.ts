import type { Filter, UnicodeData } from '$utils/types';

export const PLANE_LENGTH = 2 << 15;

export function advancedQuery(unicodeData: UnicodeData, filters: Filter[]) {
	// fix regex not passing through worker
	filters = filters.map((filter) => {
		if (filter.type !== 'name' && filter.type !== 'character') return filter;
		if (!(filter.value as string).startsWith('/') || !(filter.value as string).endsWith('/'))
			return filter;

		const regex = new RegExp((filter.value as string).slice(1, -1), 'ui');
		return { ...filter, value: regex };
	});

	let data = [...unicodeData.values()];

	for (const filter of filters) {
		data = data.filter((val) => {
			if (filter.type === 'name') {
				if (typeof filter.value === 'string') {
					// note: include oldName
					return filter.negated
						? !val.name.includes(filter.value)
						: val.name.includes(filter.value);
				}
				return filter.negated ? !filter.value.test(val.name) : filter.value.test(val.name);
			}

			if (filter.type === 'character') {
				const char = String.fromCodePoint(val.codepoint);
				return filter.negated ? !filter.value.test(char) : filter.value.test(char);
			}

			if (filter.type === 'range') {
				const [min, max] = filter.value;
				return filter.negated
					? !(val.codepoint >= min && val.codepoint <= max)
					: val.codepoint >= min && val.codepoint <= max;
			}

			if (filter.type === 'bidi') {
				return filter.negated ? val.bidiClass !== filter.value : val.bidiClass === filter.value;
			}

			throw new Error(`Unknown filter type: ${(filter as any).type}`);
		});
	}

	return data;
}
