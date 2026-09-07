import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
	{
		ignores: ['dist/**', 'coverage/**', 'node_modules/**', 'public/**'],
	},
	js.configs.recommended,
	...tseslint.configs.recommended,
	{
		rules: {
			'@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
			'prefer-const': 'error',
			eqeqeq: ['error', 'always'],
		},
	},
	{
		// The game rules are the part of this codebase that is worth testing, and
		// they are the part with no DOM in them. `src/canvas.ts` and `src/game.ts`
		// own every browser API call so the rest stays testable in Node.
		files: ['src/card.ts', 'src/deck.ts', 'src/hand.ts', 'src/stack.ts', 'src/data/**/*.ts', 'src/interfaces/**/*.ts'],
		rules: {
			'no-restricted-globals': [
				'error',
				{
					name: 'document',
					message: 'Rules modules must stay DOM-free so they can be tested in Node. DOM access belongs in src/canvas.ts.',
				},
				{ name: 'window', message: 'Rules modules must stay DOM-free so they can be tested in Node. DOM access belongs in src/canvas.ts.' },
			],
		},
	},
);
