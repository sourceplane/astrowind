import { describe, expect, it } from 'vitest';
import worker from '../../worker/index';

describe('the Worker (worker/index.ts)', () => {
  it('hands every request it receives to the assets binding, unchanged', async () => {
    const seen: string[] = [];
    const env = {
      ASSETS: {
        fetch: async (request: Request) => {
          seen.push(new URL(request.url).pathname);
          return new Response('not found', { status: 404 });
        },
      },
    };
    const response = await worker.fetch(new Request('https://example.com/no-such-page'), env);
    expect(seen).toEqual(['/no-such-page']);
    expect(response.status).toBe(404);
  });
});
