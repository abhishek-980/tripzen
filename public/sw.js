const CACHE_NAME = 'tripzen-pwa-v20261031_v54';
const STATIC_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './styles.css',
  './app.js',
  './assets/tripzen-logo.svg',
  './assets/tripzen-logo.png',
  './assets/tripzen-logo.jpg',
  './assets/auth-hero-bg.webp',
  './assets/auth-hero-bg-mobile.webp',
  './assets/mountain-hero-banner.jpg',
  './assets/chopta-tungnath-card.jpg',
  './assets/kedarkantha-card.jpg',
  './assets/hampta-card.jpg',
  './assets/kareri-lake-card.jpg',
  './assets/valley-of-flowers-card.jpg'
];

// Install: Cache core assets for instant opening
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('TripZen SW: Pre-cache asset warning:', err);
      });
    })
  );
});

// Activate: Remove stale caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: Network-first for APIs, Stale-while-revalidate for static assets
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Always use fresh network for API calls and Razorpay checkouts
  if (url.pathname.startsWith('/api') || url.hostname.includes('razorpay')) {
    event.respondWith(
      fetch(request).catch(() => {
        return new Response(
          JSON.stringify({ success: false, message: 'You are currently offline. Please check your mountain network connection.' }),
          { headers: { 'Content-Type': 'application/json' } }
        );
      })
    );
    return;
  }

  // Navigation requests: serve index.html from cache if offline
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() => {
        return caches.match('./index.html') || caches.match('./');
      })
    );
    return;
  }

  // Static assets: Stale-While-Revalidate
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const fetchPromise = fetch(request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => null);

      return cachedResponse || fetchPromise;
    })
  );
});

// Web Push Notifications
self.addEventListener('push', (event) => {
  let data = { title: 'TripZen Notification', body: 'New mountain travel update.' };
  try {
    if (event.data) {
      data = event.data.json();
    }
  } catch (e) {
    if (event.data) {
      data.body = event.data.text();
    }
  }

  const options = {
    body: data.body,
    icon: './assets/tripzen-logo.png',
    badge: './assets/tripzen-logo.png',
    vibrate: [100, 50, 100],
    data: {
      url: data.url || './#/chat'
    }
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'TripZen Expedition', options)
  );
});

// Notification Click: Focus existing window or open new
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const targetUrl = (event.notification.data && event.notification.data.url) || './#/chat';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      for (let client of windowClients) {
        if (client.url.includes('tripzen') || client.url.includes('localhost') || client.url.includes('127.0.0.1')) {
          client.navigate(targetUrl);
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});
