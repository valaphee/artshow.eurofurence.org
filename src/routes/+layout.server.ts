import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ setHeaders, isDataRequest }) => {
	if (!isDataRequest)
		try {
			setHeaders({
				'cross-origin-opener-policy': 'same-origin',

				'x-frame-options': 'DENY',
				'x-xss-protection': '0'
			});
		} catch {
			// due to a bug this will be called twice if an error occurs within a .svelte file
		}
};
