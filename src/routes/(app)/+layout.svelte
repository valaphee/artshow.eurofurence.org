<script lang="ts">
	import Icon from '#lib/components/Icon.svelte';
	import { efEmblem } from '#lib/icons.ts';
	import {
		faBars,
		faHome,
		faLandmark,
		faMoneyBill,
		faShoppingBag,
		faTag,
		faXmark
	} from '@fortawesome/free-solid-svg-icons';
	import { page } from '$app/state';
	import { onMount } from 'svelte';

	let { data, children } = $props();

	const navigation = [
		{
			name: 'Overview',
			icon: faHome,
			href: '/'
		},
		{
			name: 'Exhibits',
			icon: faLandmark,
			href: '/exhibits'
		},
		{
			name: 'Pricing',
			icon: faTag,
			href: '/pricing'
		},
		{
			name: 'Payment',
			icon: faMoneyBill,
			href: '/payment'
		},
		{
			name: 'Handout',
			icon: faShoppingBag,
			href: '/handout'
		}
	] as const;

	let sidebarOpen = $state(false);
	let isDesktop = $state(false);
	onMount(() => {
		const media = window.matchMedia('(min-width: 1024px)');
		const update = () => {
			isDesktop = media.matches;
		};
		update();
		media.addEventListener('change', update);
		return () => {
			media.removeEventListener('change', update);
		};
	});
</script>

<svelte:window
	onkeydown={(event) => {
		if (event.key === 'Escape') sidebarOpen = false;
	}}
/>

<div class="min-h-screen">
	<!-- Mobile sidebar backdrop -->
	<div
		aria-hidden="true"
		class={[
			'fixed inset-0 z-40 bg-black/75 transition-opacity lg:hidden',
			sidebarOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
		]}
		onclick={() => (sidebarOpen = false)}
	></div>

	<!-- Sidebar -->
	<aside
		aria-label="Main navigation"
		class={[
			'fixed inset-y-0 left-0 z-50 w-72 bg-primary-600 text-white transition-transform lg:translate-x-0',
			sidebarOpen ? 'translate-x-0' : '-translate-x-full'
		]}
		id="sidebar"
		inert={!sidebarOpen && !isDesktop ? true : undefined}
	>
		<div class="flex h-full flex-col px-4">
			<div class="flex h-16 items-center gap-3">
				<Icon class="h-9 w-9" icon={efEmblem} />

				<span class="flex-1 font-semibold">Eurofurence Art Show</span>

				<button
					aria-label="Close sidebar"
					class="rounded-md p-2 transition-colors hover:bg-primary-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:hidden"
					onclick={() => (sidebarOpen = false)}
					type="button"
				>
					<Icon class="h-6 w-6" icon={faXmark} />
				</button>
			</div>

			<nav class="flex-1 py-4">
				<ul class="space-y-1">
					{#each navigation as item}
						<li>
							<a
								href={item.href}
								aria-current={item.href === page.url.pathname ? 'page' : undefined}
								onclick={() => (sidebarOpen = false)}
								class={[
									'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white',
									item.href === page.url.pathname
										? 'bg-gray-50 text-primary-600'
										: 'hover:bg-primary-700'
								]}
							>
								<Icon class="h-5 w-5" icon={item.icon} />
								<span>{item.name}</span>
							</a>
						</li>
					{/each}
				</ul>
			</nav>

			<div class="flex items-center gap-3 border-t border-white/10 py-4 text-sm font-semibold">
				<img alt="" class="h-9 w-9 rounded-full bg-white" src={data.user.image} />
				<span class="min-w-0 truncate">{data.user.name}</span>
			</div>
		</div>
	</aside>

	<main class="min-w-0 lg:ml-72">
		<header class="flex h-16 items-center px-4 shadow-sm lg:hidden">
			<button
				aria-controls="sidebar"
				aria-expanded={sidebarOpen}
				aria-label="Open sidebar"
				class="rounded-md p-2 transition-colors hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
				onclick={() => (sidebarOpen = true)}
				type="button"
			>
				<Icon class="h-5 w-5" icon={faBars} />
			</button>
		</header>

		{@render children()}
	</main>
</div>
