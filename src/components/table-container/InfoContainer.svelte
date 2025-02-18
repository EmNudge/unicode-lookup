<script lang="ts">
	import {
		getPropertiesForChar,
		getPlaneForCodepoint,
		getCodepointBlock,
		Category,
		getDecompFromStr,
		BidiClassMap
	} from '$utils/unicode';
	import { blockLookupStore, symbolHtmlNamesMap } from '$stores';

	import CaseMapping from './info-tables/CaseMapping.svelte';
	import Encoding from './info-tables/Encoding.svelte';
	import NumberEquiv from './info-tables/NumberEquiv.svelte';
	import HtmlEntities from './info-tables/HtmlEntities.svelte';
	import Properties from './info-tables/Properties.svelte';
	import type { UnicodeMapData } from '@emnudge/unicode-query';

	const {
		codepoint,
		name,
		info
	}: { codepoint: number; name: string; info: UnicodeMapData } = $props();

	const category = $derived(
		`${info.category} (${Category[info.category as keyof typeof Category]})`
	);
	const charBlock = $derived(getCodepointBlock($blockLookupStore, codepoint));
	const planeData = $derived(getPlaneForCodepoint(codepoint));

	const decomposition = $derived(
		info.decompositionStr ? getDecompFromStr(info.decompositionStr) : null
	);
	const decompText = $derived(
		decomposition != null
			? `<${decomposition.type}> ${decomposition.codepoints.join(' ')}`
			: ''
	);

	const baseInfo = $derived(
		[
			['Bidi Class', `${info.bidiClass} (${BidiClassMap.get(info.bidiClass)})`],
			!!info.oldName && info.oldName !== name && ['Old Name', info.oldName],
			['Codepoint', codepoint],
			['Category', category],
			!!decompText && ['Decomposition', decompText],
			[
				'Plane',
				planeData.name
					? `${planeData.name} (Plane ${planeData.number}) `
					: `Plane ${planeData.number}`
			],
			[
				'Block',
				`${charBlock.name} (Range ${charBlock.range[0]}-${charBlock.range[1]}) `
			]
		].filter(Boolean) as [string, string][]
	);

	const properties = $derived(
		getPropertiesForChar(String.fromCodePoint(codepoint))
	);

	const htmlEntityNames = $derived(
		$symbolHtmlNamesMap.get(codepoint) ?? []
	);
</script>

<div class="container" style="--item-num: {Math.ceil(properties.length / 2)}">
	<header>
		<h1>{name}</h1>
		<div class="display-box">
			<span>
				{String.fromCodePoint(codepoint)}
			</span>
		</div>
	</header>
	<table class="basic-info">
		<tbody>
			{#each baseInfo as [name, value]}
				<tr>
					<td>{name}</td>
					<td>{value}</td>
				</tr>
			{/each}
		</tbody>
	</table>

	<HtmlEntities {codepoint} names={htmlEntityNames} />
	<CaseMapping
		lowercaseMapping={info.lowercaseMapping}
		titlecaseMapping={info.titlecaseMapping}
		uppercaseMapping={info.uppercaseMapping}
	/>
	<NumberEquiv
		digitEquiv={info.digitEquiv}
		numericEquiv={info.numericEquiv}
		decimalEquiv={info.decimalEquiv}
	/>
	<Encoding {codepoint} />

	<br />
	<Properties {properties} />
</div>

<style>
	div.container {
		border-radius: 8px;
		padding: 20px;
	}
	.basic-info {
		display: grid;
	}
	td {
		padding: 5px;
	}
	td:nth-child(1) {
		font-weight: bold;
	}
	tr:nth-child(odd) {
		background-color: var(--bg-offset);
	}
	h1 {
		text-align: center;
	}

	.display-box {
		background-color: var(--bg-offset);
		height: 64px;
		width: 64px;
		font-size: 3em;
		border: 1px solid grey;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 12px 0;
	}
	header {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
