<script lang="ts">
	import type { UnicodeMapData } from '@emnudge/unicode-query';

	const {
		digitEquiv,
		numericEquiv,
		decimalEquiv
	}: {
		digitEquiv: UnicodeMapData['digitEquiv'];
		numericEquiv: UnicodeMapData['numericEquiv'];
		decimalEquiv: UnicodeMapData['decimalEquiv'];
	} = $props();

	const numberMappings = $derived(Object.entries({
		digitEquiv,
		numericEquiv,
		decimalEquiv
	}).filter(([_, v]) => v))
</script>

{#if numberMappings.length}
	<br />
	<table>
		<thead>
			<tr>
				<th class="title" colspan="2">Number Equivalent</th>
			</tr>
		</thead>
		<tbody>
			{#each numberMappings as [key, value]}
				<tr>
					<td>{key}</td>
					<td>{value}</td>
				</tr>
			{/each}
		</tbody>
	</table>
{/if}
