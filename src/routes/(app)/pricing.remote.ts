import { command, getRequestEvent } from '$app/server';
import { z } from 'zod';
import { error } from '@sveltejs/kit';
import { sql } from 'bun';

export const price = command(
	z.object({
		exhibitId: z.coerce.number().int(),
		winningBidId: z.uuid(),
		amount: z.coerce.number().int().positive().optional()
	}),
	async ({ exhibitId, winningBidId, amount }) => {
		const { locals } = getRequestEvent();
		if (!locals.user) error(401, 'Unauthorized');

		const [bid] = await sql<
			{
				id: string;
				exhibit_id: string;
				amount: number | null;
			}[]
		>`
			SELECT
				id,
				amount
			FROM bid
			WHERE id = ${winningBidId}
		`;
		if (!bid) error(404, 'Not found');

		await sql.begin(async (tx) => {
			if (bid.amount === null && amount !== undefined) {
				await tx`
					UPDATE bid
					SET amount = ${amount}
					WHERE id = ${winningBidId}
				`;
			}

			await tx`
				UPDATE exhibit
				SET winning_bid = ${winningBidId}
				WHERE id = ${exhibitId}
			`;
		});
	}
);
