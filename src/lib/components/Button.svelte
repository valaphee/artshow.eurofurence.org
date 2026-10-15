<script lang="ts">
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

	let {
		class: classValue,
		children,
		...restProps
	}:
		| ({
				href: string;
		  } & HTMLAnchorAttributes)
		| ({
				href?: undefined;
		  } & HTMLButtonAttributes) = $props();

	const base =
		'inline-flex shrink-0 items-center gap-2 rounded-md bg-primary-600 px-3.5 py-2 font-semibold text-white shadow-sm transition-colors hover:bg-primary-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600  disabled:cursor-not-allowed disabled:opacity-50';
</script>

{#if restProps.href !== undefined}
	<a {...restProps} class={[base, classValue]}>
		{@render children?.()}
	</a>
{:else}
	<button {...restProps} class={[base, classValue]}>
		{@render children?.()}
	</button>
{/if}
