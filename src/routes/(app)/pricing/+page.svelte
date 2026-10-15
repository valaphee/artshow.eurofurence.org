<script lang="ts">
	import Input from '#lib/components/Input.svelte';

	let { data } = $props();

	let exhibitId = $state('');
	let filteredExhibits = $derived(
		exhibitId.trim()
			? data.exhibits.filter((exhibit) => String(exhibit.id) === exhibitId.trim())
			: data.exhibits
	);
	let groupedExhibits = $derived(
		Object.entries(Object.groupBy(filteredExhibits, (exhibit) => exhibit.exhibition_space_id))
	);

	let winningBidId = $state('');
	let amount = $state<number | undefined>();

	let needsAmount = $state(false);
</script>

<svelte:head>
	<title>Pricing - Eurofurence Art Show</title>
</svelte:head>

<div class="space-y-4 border-b border-gray-200 p-6">
	<h1 class="text-xl font-semibold text-gray-900">Pricing</h1>

	<Input
		bind:value={exhibitId}
		autocomplete="off"
		autofocus
		placeholder="Scan exhibit..."
		type="search"
	/>

	{#if exhibitId}
		<div class="flex gap-3">
			<Input
				bind:value={winningBidId}
				autocomplete="off"
				class="flex-1"
				placeholder="Scan winning bid..."
				type="search"
			/>

			{#if needsAmount}
				<Input bind:value={amount} autocomplete="off" placeholder="Enter amount..." type="number" />
			{/if}
		</div>
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
