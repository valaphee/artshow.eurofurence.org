import { defineEnvVars } from '@sveltejs/kit/env';
import { building } from '$app/env';
import * as z from 'zod';

export const variables = defineEnvVars({
	DATABASE_URL: {
		schema: building ? z.optional(z.string()) : z.string()
	},
	S3_URL: {
		public: true
	},
	IDP_URL: {
		schema: building ? z.optional(z.string()) : z.string()
	},
	IDP_CLIENT_ID: {
		schema: building ? z.optional(z.string()) : z.string()
	},
	IDP_CLIENT_SECRET: {
		schema: building ? z.optional(z.string()) : z.string()
	},
	ATTSRV_URL: {
		schema: building ? z.optional(z.string()) : z.string()
	}
});
