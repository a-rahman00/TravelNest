const cacheName = "travelnest-cache-v1";

const filesToCache = [
    "index.html",
    "destinations.html",
    "budget.html",
    "generator.html",
    "mood.html",
    "feedback.html",
    "css/styles.css",
    "js/data.js",
    "js/main.js",
    "js/destinations.js",
    "js/budget.js",
    "js/generator.js",
    "js/mood.js",
    "js/feedback.js",
    "manifest.json",
    "images/logo.png.svg"
];

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
});