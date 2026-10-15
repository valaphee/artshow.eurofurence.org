import type { LayoutServerLoad } from './$types';
import auth from '#lib/server/auth.ts';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ locals, request, url }) => {
	const user = locals.user;
	if (!user) {
		const result = await auth.api.signInSocial({
			headers: request.headers,
			body: {
				provider: 'eurofurence',
				callbackURL: url.pathname + url.search
			}
		});

		redirect(303, result.url!, { external: true });
	}

	return {
		user: {
			name: user.name,
			image: user.image
		}
	};
};
