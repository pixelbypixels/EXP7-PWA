// Register Service Worker and trigger background sync
if ('serviceWorker' in navigator && 'SyncManager' in window) {
    navigator.serviceWorker.register('sw.js')
      .then((registration) => {
        console.log('✅ Service Worker Registered');
  
        // Request Notification Permission
        if ('Notification' in window && Notification.permission !== 'granted') {
          Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
              console.log('🔔 Notification permission granted.');
            } else {
              console.warn('🔕 Notification permission denied.');
            }
          });
        }
  
        // Trigger background sync
        return registration.sync.register('sync-products');
      })
      .catch((err) => console.error('❌ SW Registration failed:', err));
  }
  