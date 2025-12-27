<script lang="ts">
	const { names, codepoint }: { names: string[]; codepoint: number } = $props();
</script>

<br />
<table>
	<thead>
		<tr>
			<th class="title" colspan="2">Html Entities</th>
		</tr>
	</thead>
	<tbody>
		{#each names as name}
			<tr>
				<td>Named</td>
				<td>&{name};</td>
			</tr>
		{/each}
		<tr>
			<td>Hex</td>
			<td>&#x{codepoint.toString(16).padStart(5, '0')};</td>
		</tr>
		<tr>
			<td>Dec</td>
			<td>&#{codepoint};</td>
		</tr>
	</tbody>
</table>

<style>
	th {
		text-align: left;
		color: var(--primary-text);
		font-weight: 400;
		padding-bottom: 6px;
	}
	tbody tr:nth-child(odd) {
		background-color: var(--bg-offset);
	}
	td {
		padding: 6px;
	}
	td:first-child {
		padding-right: 30px;
	}
</style>
