// sw.js

// Install event
self.addEventListener('install', (event) => {
    console.log('Service Worker installing...');
    self.skipWaiting(); // Activate worker immediately
  });
  
  // Activate event
  self.addEventListener('activate', (event) => {
    console.log('Service Worker activating...');
  });
  
  // Fetch event (Optional: caching strategy or offline handling)
  self.addEventListener('fetch', (event) => {
    console.log('Fetching:', event.request.url);
  });
  