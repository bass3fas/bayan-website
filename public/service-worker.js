const CACHE_NAME = "bayan-cache-v1";
const ASSETS_TO_CACHE = [
    "/",
    "/favicon.ico",
    "/manifest.json",
    "/assets/icons/icon-192x192.png",
    "/assets/icons/icon-512x512.png",
    "/offline.html" // Custom offline page
];

// Install event - Cache assets
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// Activate event - Clean up old caches
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => name !== CACHE_NAME)
                    .map((name) => caches.delete(name))
            );
        })
    );
});

// Fetch event - Serve from cache, then fetch from network
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            return (
                cachedResponse ||
                fetch(event.request)
                    .then((response) => {
                        return response;
                    })
                    .catch(() => caches.match("/offline.html")) // Show offline page if fetch fails
            );
        })
    );
});
