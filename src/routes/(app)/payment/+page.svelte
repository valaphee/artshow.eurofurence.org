<script lang="ts">
	import { faCheck } from '@fortawesome/free-solid-svg-icons';
	import Icon from '#lib/components/Icon.svelte';
	import Button from '#lib/components/Button.svelte';
	import Input from '#lib/components/Input.svelte';
	import { getPaymentExhibits } from '../payment.remote.ts';

	const currency = new Intl.NumberFormat('en-DE', {
		style: 'currency',
		currency: 'EUR'
	});

	let badgeNumber = $state('');

	let exhibits = $derived(
		badgeNumber ? (getPaymentExhibits(parseInt(badgeNumber)).current ?? []) : []
	);
	let total = $derived(exhibits.reduce((sum, exhibit) => sum + exhibit.price, 0));
</script>

<svelte:head>
	<title>Payment - Eurofurence Art Show</title>
</svelte:head>

<div class="space-y-4 border-b border-gray-200 p-6">
	<h1 class="text-xl font-semibold text-gray-900">Payment</h1>

	<Input
		bind:value={badgeNumber}
		autocomplete="off"
		autofocus
		placeholder="Scan badge..."
		type="search"
	/>
</div>

<div class="space-y-6 p-6">
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
			<col class="w-40" />
		</colgroup>

		<thead>
			<tr>
				<th scope="col"></th>
				<th scope="col">Name</th>
				<th class="text-right!" scope="col">Price</th>
			</tr>
		</thead>

		<tbody>
			{#each exhibits as exhibit (exhibit.id)}
				<tr>
					<td>{exhibit.id}</td>
					<td>{exhibit.name}</td>
					<td class="text-right! tabular-nums">{currency.format(exhibit.price)}</td>
				</tr>
			{/each}
		</tbody>
	</table>

	<div class="flex justify-between border-t border-gray-200 pt-4">
		<span class="font-semibold">Total</span>
		<span class="text-xl font-semibold tabular-nums">{currency.format(total)}</span>
	</div>

	<Button class="w-full justify-center" type="button">
		<Icon class="h-4 w-4" icon={faCheck} />
		Mark {currency.format(total)} paid
	</Button>
</div>
