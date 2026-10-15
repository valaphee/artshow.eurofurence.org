import { getRequestEvent, query } from '$app/server';
import { error } from '@sveltejs/kit';
import { sql } from 'bun';
import { z } from 'zod';

export const getPaymentExhibits = query(z.number().int().positive(), async (badgeNumber) => {
	const { locals } = getRequestEvent();
	if (!locals.user) error(401, 'Unauthorized');

	return await sql<
		{
			id: string;
			name: string;
			price: number;
		}[]
	>`
			SELECT
				exhibit.id,
				exhibit.name,
				bid.amount as price
			FROM exhibit
			JOIN bid
				ON bid.id = exhibit.winning_bid
			JOIN "user"
				ON "user".id = bid.bidder_id
			WHERE "user"."badgeNumber" = ${badgeNumber}
			ORDER BY exhibit.exhibition_space_id
		`;
});
