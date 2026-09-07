/// <reference types="vite/client" />

/**
 * The released version, injected at build time by `vite.config.ts` from
 * package.json — which semantic-release bumps during the release job. Shown in
 * the page footer so a deployed site can be identified without guessing.
 */
declare const __APP_VERSION__: string;
