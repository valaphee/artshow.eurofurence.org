import adapter from '@sveltejs/adapter-node';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true,
				experimental: { async: true }
			},
			adapter: adapter(),
			csp: {
				directives: {
					'default-src': ['self'],
					'img-src': ['self', 'blob:', 'data:', 's3.eurofurence.org'],
					'object-src': ['none'],
					'script-src': ['strict-dynamic'],
					'base-uri': ['none'],
					'frame-ancestors': ['none']
				}
			},
			experimental: { remoteFunctions: true, forkPreloads: true }
		})
	]
});
