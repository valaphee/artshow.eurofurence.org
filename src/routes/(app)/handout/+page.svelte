<script lang="ts">
	import Input from '#lib/components/Input.svelte';
	import { getHandoutExhibits } from '../handout.remote.ts';

	let badgeNumber = $state('');

	let exhibits = $derived(badgeNumber ? getHandoutExhibits(parseInt(badgeNumber)) : undefined);
	let groupedExhibits = $derived(
		Object.entries(
			Object.groupBy(exhibits?.current ?? [], (exhibit) => exhibit.exhibition_space_id)
		)
	);
</script>

<svelte:head>
	<title>Handout - Eurofurence Art Show</title>
</svelte:head>

<div class="space-y-4 border-b border-gray-200 p-6">
	<h1 class="text-xl font-semibold text-gray-900">Handout</h1>

	<Input
		bind:value={badgeNumber}
		autocomplete="off"
		autofocus
		placeholder="Scan badge..."
		type="search"
	/>

	{#if badgeNumber}
		<Input autocomplete="off" placeholder="Scan exhibits..." type="search" />
	{/if}
</div>

<table
	class={[
		'w-full divide-y divide-gray-200',
		'[&_th]:px-2 [&_th]:text-left [&_th]:text-xs [&_th]:font-semibold [&_th]:tracking-wide [&_th]:text-gray-500 [&_th]:uppercase',
		'[&_thead_tr]:h-10',
		'[&_tbody]:divide-y [&_tbody]:divide-gray-200',
		'[&_tbody_tr]:h-10 [&_tbody_tr]:hover:bg-gray-50',
		'[&_td]:px-2 [&_td]:text-sm [&_td]:whitespace-nowrap'
	]}
>
	<colgroup>
		<col class="w-40" />
		<col />
	</colgroup>

	<thead>
		<tr class="bg-gray-50">
			<th scope="col"></th>
			<th scope="col">Name</th>
		</tr>
	</thead>

	<tbody>
		{#each groupedExhibits as [exhibitionSpaceId, exhibits] (exhibitionSpaceId)}
			<tr class="bg-gray-50">
				<th scope="rowgroup" colspan="2">Space {exhibitionSpaceId}</th>
			</tr>

			{#each exhibits as exhibit (exhibit.id)}
				<tr>
					<td>{exhibit.id}</td>
					<td>{exhibit.name}</td>
				</tr>
			{/each}
		{/each}
	</tbody>
</table>
