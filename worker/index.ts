import { router } from './router';

addEventListener('fetch', (event: FetchEvent): void => {
  event.respondWith(router.handle(event.request));
});
