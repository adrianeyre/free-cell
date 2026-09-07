import { readFileSync } from 'node:fs';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vitest/config';

/**
 * The published version, read from the manifest rather than written twice.
 *
 * Releases are cut automatically by semantic-release, so a version typed into
 * the page would be wrong within a release of being written.
 */
const { version } = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8')) as { version: string };

export default defineConfig({
	// Relative, not absolute: GitHub Pages serves this repo from a sub-path
	// (`/free-cell/`) while the custom domain serves it from another, and a
	// relative base is the only one that is correct under both.
	base: './',
	define: {
		__APP_VERSION__: JSON.stringify(version),
	},
	server: {
		host: true,
		port: 5173,
		open: false,
	},
	preview: {
		host: true,
		port: 4173,
	},
	build: {
		outDir: 'dist',
		emptyOutDir: true,
		sourcemap: true,
		target: 'es2022',
		rollupOptions: {
			input: {
				index: fileURLToPath(new URL('./index.html', import.meta.url)),
			},
		},
	},
	test: {
		// The rules modules are deliberately DOM-free (see eslint.config.js), so
		// the suite needs no jsdom.
		environment: 'node',
		include: ['tests/**/*.test.ts'],
		coverage: {
			provider: 'v8',
			reporter: ['text', 'lcov'],
			include: ['src/**/*.ts'],
			exclude: ['src/interfaces/**', 'src/index.ts'],
		},
	},
});
