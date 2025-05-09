globalThis.process ??= {}; globalThis.process.env ??= {};
export { renderers } from '../renderers.mjs';

const page = () => import('./pages/keystatic-api_B5KH4Nkg.mjs').then(n => n.k);

export { page };
