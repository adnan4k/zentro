// Base URL for the Zentro API.
// - Local dev: empty string → relative /api/* requests, proxied to :3001 by the
//   rewrite in next.config.js.
// - Static export (cPanel): set NEXT_PUBLIC_API_URL at build time to the
//   absolute URL of the hosted API, e.g. https://api.example.com
export const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? '';
