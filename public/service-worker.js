importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox) {
    console.log(`Workbox berhasil dimuat`);
} else {
    console.log(`Workbox gagal dimuat`);
}

workbox.precaching.precacheAndRoute([
    {url: '/index.html', revision: '1'},
    {url: '/club.html', revision: '2'},
    {url: '/nav.html', revision: '1'},
    {url: '/main.js', revision: '2'},
    {url: '/manifest.json', revision: '1'},
    {url: '/push.js', revision: '1'},
    {url: '/img/icon_192.png', revision: '1'},
    {url: '/img/icon_512.png', revision: '1'},
    {url: '/img/maskable_icon.png', revision: '1'},
    {url: '/js/api.js', revision: '2'},
    {url: '/js/app.js', revision: '1'},
    {url: '/js/db.js', revision: '1'},
    {url: '/js/idb.js', revision: '1'},
    {url: '/js/nav.js', revision: '1'},
    {url: '/materialize/css/materialize.min.css', revision: '1'},
    {url: '/materialize/js/materialize.min.js', revision: '1'},
],{
    ignoreUrlParametersMatching: [/.*/]
});


workbox.routing.registerRoute(
    new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'pages'
    })
)

workbox.routing.registerRoute(
    '/\.(?:png|gif|jpg|jpeg|svg)$/',
    workbox.strategies.cacheFirst()
)

workbox.routing.registerRoute(
    /^https:\/\/api\.football-data\.org\/v2/,
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'football-data-api'
    })
)

workbox.routing.registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
    })
);


workbox.routing.registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    workbox.strategies.cacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200],
            }),
            new workbox.expiration.Plugin({
                maxAgeSeconds: 60 * 60 * 24 * 365,
                maxEntries: 30,
            }) 
        ]
    })
)


self.addEventListener('push', event=>{
    let body;
    if (event.data) {
        body = event.data.text();
    }else {
        body = 'Push no payload';
    }

    var options = {
        body: body,
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };

    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});