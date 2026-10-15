import { getRequestEvent, query } from '$app/server';
import { error } from '@sveltejs/kit';
import { sql } from 'bun';
import { z } from 'zod';

export const getHandoutExhibits = query(z.number().int().positive(), async (badgeNumber) => {
	const { locals } = getRequestEvent();
	if (!locals.user) error(401, 'Unauthorized');

	return await sql<
		{
			id: string;
			exhibition_space_id: number;
			name: string;
			winning_bid: string;
			amount: number;
		}[]
	>`
			SELECT
				exhibit.id,
				exhibit.exhibition_space_id,
				exhibit.name
			FROM exhibit
			JOIN bid
				ON bid.id = exhibit.winning_bid
			JOIN "user"
				ON "user".id = bid.bidder_id
			WHERE "user"."badgeNumber" = ${badgeNumber}
			ORDER BY exhibit.exhibition_space_id
		`;
});
