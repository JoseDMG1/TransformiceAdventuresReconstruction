import { access } from 'node:fs/promises';
export async function resolve(specifier, context, nextResolve) {
 try { return await nextResolve(specifier, context); }
 catch(error) {
  if (error.code === 'ERR_MODULE_NOT_FOUND' && error.url?.includes('/@modelcontextprotocol/') && error.url.endsWith('.mjs')) {
   const fallback = error.url.slice(0, -4) + '.cjs';
   await access(new URL(fallback));
   return { url: fallback, shortCircuit: true };
  }
  throw error;
 }
}
