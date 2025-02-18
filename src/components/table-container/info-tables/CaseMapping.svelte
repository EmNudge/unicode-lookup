<script lang="ts">
	import type { UnicodeMapData } from '@emnudge/unicode-query';

	const {
		titlecaseMapping,
		uppercaseMapping,
		lowercaseMapping
	}: {
		titlecaseMapping: UnicodeMapData['titlecaseMapping'];
		uppercaseMapping: UnicodeMapData['uppercaseMapping'];
		lowercaseMapping: UnicodeMapData['lowercaseMapping'];
	} = $props();

	const caseMappings = $derived(
		Object.entries({
			titlecaseMapping,
			uppercaseMapping,
			lowercaseMapping
		}).filter(([_k, v]) => v) as [string, number][]
	);
</script>

{#if caseMappings.length}
	<br />
	<table>
		<thead>
			<tr>
				<th class="title" colspan="2">Case Mapping</th>
			</tr>
		</thead>
		<tbody>
			{#each caseMappings as [key, value]}
				<tr>
					<td>{key}</td>
					<td>{String.fromCodePoint(value)}</td>
				</tr>
			{/each}
		</tbody>
	</table>
{/if}
