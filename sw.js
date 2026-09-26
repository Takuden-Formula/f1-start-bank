// F1スタート貯金箱: オフライン用キャッシュ
// iPhone が ESP32 の Wi-Fi（インターネットなし）につながっていてもアプリを開けるようにする。
// ネットにつながっているときは裏で最新版を取りに行き、次回起動時に反映される。
const CACHE = 'f1bank-v6';
const FILES = ['./', 'index.html', 'icon.png',
  'sound/0001.mp3', 'sound/0004.mp3', 'sound/0005.mp3'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (url.origin !== self.location.origin || e.request.method !== 'GET') return;  // ESP32 への通信は素通し
  e.respondWith(caches.open(CACHE).then(async c => {
    const hit = await c.match(e.request, { ignoreSearch: true });
    const net = fetch(e.request).then(r => { if (r.ok) c.put(e.request, r.clone()); return r; }).catch(() => null);
    return hit || (await net) || new Response('offline', { status: 503 });
  }));
});
