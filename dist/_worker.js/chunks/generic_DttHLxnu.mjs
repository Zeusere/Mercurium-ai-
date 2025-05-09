globalThis.process ??= {}; globalThis.process.env ??= {};
export { renderers } from '../renderers.mjs';

const page = () => import('./pages/generic_DPF46I8o.mjs').then(n => n.g);

export { page };
