/**
 * RRLabs Service Worker - v2.0
 * Optimized for High-Precision Revenue Recovery Infrastructure
 */

const CACHE_NAME = 'rrlabs-core-v2';
const OFFLINE_URL = '/offline.html';

// অত্যাবশ্যকীয় ফাইল যা অফলাইনেও আপনার ব্র্যান্ড ভ্যালু ধরে রাখবে
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/dashboard.html',
  OFFLINE_URL,
  '/Rrlabs_Logo_transparent.png',
  '/style.css',
  '/main.js',
  '/navbar.js',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap'
];

// Install: ইম্পর্টেন্ট অ্যাসেটগুলো প্রি-ক্যাশ করা
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[RRLabs Sentinel] Building local infrastructure cache...');
      return cache.addAll(STATIC_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activate: ইনভেন্টরি ক্লিনআপ (পুরনো ক্যাশ ডিলিট করা)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[RRLabs Sentinel] Purging legacy cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Strategy: Network First with Offline Fallback
self.addEventListener('fetch', (event) => {
  // শুধুমাত্র GET রিকোয়েস্ট হ্যান্ডেল করা হবে (Auth বা POST রিকোয়েস্ট ক্যাশ করা রিস্কি)
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // নেটওয়ার্ক ঠিক থাকলে ক্যাশে লেটেস্ট কপি সেভ করে রাখা
        if (response && response.status === 200 && response.type === 'basic') {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      })
      .catch(() => {
        // ইন্টারনেট না থাকলে প্রথমে ম্যাচ করা ফাইল খোঁজা, না পেলে অফলাইন পেজ দেখানো
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) return cachedResponse;

          // যদি ইউজার কোনো পেজ (Navigation) রিকোয়েস্ট করে থাকে, তবেই অফলাইন পেজ দেখানো
          if (event.request.mode === 'navigate') {
            return caches.match(OFFLINE_URL);
          }
        });
      })
  );
});
