const CACHE_NAME = 'offline';
// Customize this with a different URL if needed.
const OFFLINE_URL = 'offline.html';

const FILES_TO_CACHE = [
    '/offline.html',
    '/fonts/Quicksand-VariableFont_wght.ttf',
    '/icon/favicon.ico',
    '/icon/favicon-16x16.png',
    '/icon/favicon-32x32.png',
    '/icon/favicon-96x96.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil((async () => {
        const cache = await caches.open(CACHE_NAME);
        // Setting {cache: 'reload'} in the new request will ensure that the response
        // isn't fulfilled from the HTTP cache; i.e., it will be from the network.
        await cache.addAll(FILES_TO_CACHE);
    })());
});

self.addEventListener('fetch', event => {
    event.respondWith((async () => {
        try {

            const preloadResponse = await event.preloadResponse;
            if (preloadResponse) {
                return preloadResponse;
            }

            return await fetch(event.request);
        } catch (error) {

            console.log('Fetch failed; returning offline page instead.', error);
            console.log(event);

            let valido = await caches.match(event.request,{ignoreVary: true});

            if(valido){
                return valido;
            }

            return await caches.match(OFFLINE_URL);
        }
    })());

});

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});