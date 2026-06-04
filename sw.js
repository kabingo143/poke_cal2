// キャッシュ名（バージョン管理用）
const CACHE = 'poke-dmg-v4';

// キャッシュするファイル一覧
const FILES = [
  './index.html',
  './pokemon.js',
  './waza.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './pokemon_ng.js'
];

// インストール時：全ファイルをキャッシュ
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())
  );
});

// アクティベート時：古いキャッシュを削除
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// フェッチ：キャッシュ優先、なければネット取得
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
