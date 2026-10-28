import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, expect, it } from 'vitest';
import { METADATA, SITE } from 'theme:config';
import Logo from '../components/Logo.astro';
import { SITE_NAME } from '../site';

// Astro escapes text it renders; a site name may carry `&` or `'`.
const escaped = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

describe('site identity (src/site.ts)', () => {
  it('names the site', () => {
    expect(SITE_NAME.trim()).not.toBe('');
  });

  it('is the name the theme config carries — not a second copy in config.yaml', () => {
    expect(SITE.name).toBe(SITE_NAME);
    expect(METADATA.title?.default).toBe(SITE_NAME);
    expect(METADATA.title?.template).toBe(`%s — ${SITE_NAME}`);
  });

  it('is what the header logo says', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Logo);
    expect(html).toContain(escaped(SITE_NAME));
  });
});
