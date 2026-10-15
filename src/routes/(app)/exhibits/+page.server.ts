import type { PageServerLoad } from './$types';
import { sql } from 'bun';

export const load: PageServerLoad = async ({ locals }) => {
	const user = locals.user;
	if (!user) return;

	const exhibits = await sql<
		{
			id: string;
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
