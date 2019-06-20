const cacheName = 'restaurant-app-reviews-v1';

self.addEventListener('install', function(event) {

  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/restaurant.html',
        '/js/main.js',
        '/js/dbhelper.js',
        '/js/restaurant_info.js',
        '/data/restaurants.json',
        '/css/styles.css',
        '/img/1.jpg',
        '/img/2.jpg',
        '/img/3.jpg',
        '/img/4.jpg',
        '/img/5.jpg',
        '/img/6.jpg',
        '/img/7.jpg',
        '/img/8.jpg',
        '/img/9.jpg',
        '/img/10.jpg',
      ]);
    })
  );
});

self.addEventListener('activate', function(event) {

  event.waitUntil(

    caches.keys().then(function(cacheNames) {

      return Promise.all(
        cacheNames.filter(function(cacheName) {

          return cacheName.startsWith('restaurant-') &&
                 cacheName != cacheName;

        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {

  event.respondWith(
    caches.match(event.request).then(response => {

      return response ||
      fetch(event.request)
	  .then(res => {

	 	 const response = res.clone();
		 caches.open(cacheName)
		 .then(cache => {
		 	cache.put(event.request, response);
		 });

		 return res
		 });
    })
  );
});