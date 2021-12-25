import { Router } from 'itty-router';
import { handleWebhook } from './src/handler';

export const router = Router();

router.post('/hook', async (req: Request): Promise<Response> => {
  const body: Update = await req.json();

  try {
    return handleWebhook(body);
  } catch (e) {
    return new Response((e as Error).message, { status: 500 });
  }
});

router.post('*', () => new Response('Not Found', { status: 404 }));

router.all(
  '*',
  () =>
    new Response('Method Not Allowed', {
      status: 405,
      headers: { Allow: 'POST' },
    })
);
