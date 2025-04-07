// INSTALL: Cache app shell
self.addEventListener('install', (event) => {
    console.log('[Service Worker] Installed');
    event.waitUntil(
      caches.open('v2').then((cache) => {
        return cache.addAll([
          '/',
          '/index.html',
          '/style.css',
          '/script.js',
          '/manifest.json',
          '/icons/icon-192.png'
        ]);
      })
    );
  });
  
  // ACTIVATE
  self.addEventListener('activate', (event) => {
    console.log('[Service Worker] Activated');
    // Optional: Clean old caches
    event.waitUntil(
      caches.keys().then((keys) =>
        Promise.all(
          keys.map((key) => {
            if (key !== 'v2') {
              console.log('[Service Worker] Removing old cache:', key);
              return caches.delete(key);
            }
          })
        )
      )
    );
  });
  
  // FETCH: Serve from cache or network
  self.addEventListener('fetch', (event) => {
    console.log('[Service Worker] Fetching:', event.request.url);
    event.respondWith(
      caches.match(event.request).then((res) => {
        return res || fetch(event.request);
      })
    );
  });
  
  // SYNC: Background sync example
  self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-products') {
      console.log('[Service Worker] Background Sync - Products');
      event.waitUntil(syncProductData());
    }
  });
  
  function syncProductData() {
    return new Promise((resolve) => {
      // Simulated background sync task
      setTimeout(() => {
        console.log('✅ Product data synced in background!');
        resolve();
      }, 2000);
    });
  }
  
  // PUSH: Show notification when push received
  self.addEventListener('push', (event) => {
    console.log('[Service Worker] Push Received');
    let data = {};
  
    try {
      data = event.data.json();
    } catch (e) {
      console.warn('Push data is not JSON:', event.data.text());
      data = { title: 'ShopEase Notification', body: event.data.text() };
    }
  
    const title = data.title || 'ShopEase';
    const options = {
      body: data.body || 'You have a new update!',
      icon: '/icons/icon-192.png',
    };
  
    event.waitUntil(
      self.registration.showNotification(title, options)
    );
  });
  