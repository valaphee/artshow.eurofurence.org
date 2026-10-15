import { getRequestEvent } from '$app/server';
import { DATABASE_URL, IDP_CLIENT_ID, IDP_CLIENT_SECRET, IDP_URL } from '$app/env/private';
import { S3_URL } from '$app/env/public';
import { betterAuth } from 'better-auth';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { genericOAuth } from 'better-auth/plugins';
import { Pool } from 'pg';

export default betterAuth({
	database: new Pool({
		connectionString: DATABASE_URL
	}),
	plugins: [
		genericOAuth({
			config: [
				{
					providerId: 'eurofurence',
					discoveryUrl: `${IDP_URL}/.well-known/openid-configuration`,

					clientId: IDP_CLIENT_ID!,
					clientSecret: IDP_CLIENT_SECRET,
					tokenEndpointAuth: {
						method: 'client_secret_basic'
					},
					scopes: ['openid', 'profile', 'email', 'groups'],

					mapProfileToUser: (profile) => ({
						name: profile.name,
						email: profile.email,
						image: `${S3_URL}/identity-avatars/${profile.avatar}`,
						emailVerified: profile.emailVerified
					})
				}
			]
		}),
		sveltekitCookies(getRequestEvent)
	],
	user: {
		additionalFields: {
			badgeNumber: {
				type: 'number',
				required: false,
				input: false,
				returned: true
			}
		}
	},
	advanced: {
		database: {
			generateId: 'uuid'
		}
	}
});
