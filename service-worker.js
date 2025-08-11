self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('romaji2jp-cache').then(cache => {
            return cache.addAll([
                'index.html',
                'manifest.json',
                'service-worker.js',
                'https://unpkg.com/wanakana'
            ]);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});