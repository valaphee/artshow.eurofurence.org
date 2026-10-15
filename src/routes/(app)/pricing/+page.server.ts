import { sql } from 'bun';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const user = locals.user;
	if (!user)
		return {
			exhibits: []
		};

	const exhibits = await sql<
		{
			id: number;
			exhibition_space_id: number;
			name: string;
		}[]
	>`
		SELECT id, exhibition_space_id, name
		FROM exhibit
		ORDER BY exhibition_space_id
	`;

	return {
		exhibits
	};
};
