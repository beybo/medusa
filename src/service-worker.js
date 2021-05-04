const CACHE_NAME = 'offline';
// Customize this with a different URL if needed.
const OFFLINE_URL = 'offline.html';

const FILES_TO_CACHE = [
    '/offline.html',
    '/fonts/Quicksand-VariableFont_wght.ttf'
];

self.addEventListener('install', (event) => {
    event.waitUntil((async () => {
        const cache = await caches.open(CACHE_NAME);
        // Setting {cache: 'reload'} in the new request will ensure that the response
        // isn't fulfilled from the HTTP cache; i.e., it will be from the network.
        await cache.addAll(FILES_TO_CACHE);
    })());

    self.skipWaiting();
});

self.addEventListener('fetch', event => {
    event.respondWith((async () => {
        try {
            // First, try to use the navigation preload response if it's supported.
            const preloadResponse = await event.preloadResponse;
            if (preloadResponse) {
                return preloadResponse;
            }

            return await fetch(event.request);
        } catch (error) {
            // catch is only triggered if an exception is thrown, which is likely
            // due to a network error.
            // If fetch() returns a valid HTTP response with a response code in
            // the 4xx or 5xx range, the catch() will NOT be called.
            console.log('Fetch failed; returning offline page instead.', error);

            const cache = await caches.open(CACHE_NAME);
            return await cache.match(OFFLINE_URL);
        }
    })());

});

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});