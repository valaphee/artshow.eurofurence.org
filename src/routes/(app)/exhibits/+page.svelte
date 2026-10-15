<script lang="ts">
	import Icon from '#lib/components/Icon.svelte';
	import { faPlus } from '@fortawesome/free-solid-svg-icons';
	import Button from '#lib/components/Button.svelte';
	import Input from '#lib/components/Input.svelte';

	let { data } = $props();

	let exhibitQuery = $state('');
	let filteredExhibits = $derived(
		exhibitQuery.trim()
			? data.exhibits.filter(
					(exhibit) =>
						String(exhibit.id) === exhibitQuery.trim() ||
						exhibit.name.toLowerCase().includes(exhibitQuery.trim().toLowerCase())
				)
			: data.exhibits
	);
	let groupedExhibits = $derived(
		Object.entries(Object.groupBy(filteredExhibits, (exhibit) => exhibit.exhibition_space_id))
	);
</script>

<svelte:head>
	<title>Exhibits - Eurofurence Art Show</title>
</svelte:head>

<div class="space-y-4 border-b border-gray-200 p-6">
	<h1 class="text-xl font-semibold text-gray-900">Exhibits</h1>

	<div class="flex items-center gap-3">
		<Input
			bind:value={exhibitQuery}
			autocomplete="off"
			autofocus
			class="w-full"
			placeholder="Search exhibits..."
			type="search"
		/>

		<Button class="px-3.5 py-2 text-sm" type="button">
			<Icon class="h-4 w-4" icon={faPlus} />
			Add exhibit
		</Button>
	</div>
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
