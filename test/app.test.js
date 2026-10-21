import { test } from 'node:test';
import assert from 'node:assert/strict';
import { handleRequest } from '../server.js';

const call = (path) => handleRequest(new Request(`http://localhost${path}`));

test('landing page returns 200 with HTML and UTF-8 charset', async () => {
  const res = await call('/');
  assert.equal(res.status, 200);
  assert.match(res.headers.get('content-type'), /text\/html;\s*charset=utf-8/);
  const text = await res.text();
  assert.match(text, /<!doctype html>/i);
  assert.match(text, /<title>/);
});

test('/healthz returns 200 JSON with status ok', async () => {
  const res = await call('/healthz');
  assert.equal(res.status, 200);
  assert.match(res.headers.get('content-type'), /application\/json/);
  const json = await res.json();
  assert.equal(json.status, 'ok');
  assert.equal(typeof json.version, 'string');
});

test('self-hosted font is served with immutable cache header', async () => {
  const res = await call('/assets/outfit-latin.woff2');
  assert.equal(res.status, 200);
  assert.equal(res.headers.get('content-type'), 'font/woff2');
  assert.equal(res.headers.get('cache-control'), 'public, max-age=31536000, immutable');
  const buffer = Buffer.from(await res.arrayBuffer());
  assert.equal(buffer.subarray(0, 4).toString(), 'wOF2');
});

test('the landing page loads no external third-party scripts or styles', async () => {
  const res = await call('/');
  const html = await res.text();
  // Ensure no third-party CDNs, fonts, or tracking scripts are requested
  assert.doesNotMatch(html, /https?:\/\/(?!service\.w-b\.dev|example\.com|www\.w3\.org)/);
});

test('the landing page includes accessible ARIA markup', async () => {
  const res = await call('/');
  const html = await res.text();
  assert.match(html, /role="tablist"/);
  assert.match(html, /role="tab"/);
  assert.match(html, /aria-selected="true"/);
  assert.match(html, /role="status"/);
  assert.match(html, /aria-live="polite"/);
});

test('CSS includes design tokens and reduced-motion query', async () => {
  const res = await call('/page.css');
  assert.equal(res.status, 200);
  assert.match(res.headers.get('content-type'), /text\/css/);
  const css = await res.text();
  assert.match(css, /--paper:/);
  assert.match(css, /--indigo:/);
  assert.match(css, /--violet:/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /:focus-visible/);
});

test('unknown routes return 404', async () => {
  const res = await call('/nonexistent-page-path');
  assert.equal(res.status, 404);
});
