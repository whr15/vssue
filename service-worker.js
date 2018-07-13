/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.3.0/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "f2b64d81468ae67e7fde6fcb4cec9b95"
  },
  {
    "url": "assets/css/0.styles.dbd441e3.css",
    "revision": "634e53a5c37f8eac5e38e35a7db6474d"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/1.b224087c.js",
    "revision": "c9c75167a632a93f8462f36049e1f618"
  },
  {
    "url": "assets/js/2.5f1f7d7e.js",
    "revision": "c5e4e752d57bf047eb2fe2fee7448ffd"
  },
  {
    "url": "assets/js/3.30285fb6.js",
    "revision": "90a1410fad8caef12a19b2678c90d0bd"
  },
  {
    "url": "assets/js/4.cb990dc7.js",
    "revision": "2c76766f868ecb7917c3c83377d3713a"
  },
  {
    "url": "assets/js/5.d6dc94fc.js",
    "revision": "3b5b16d2c9f8d619f2798aeec0108ec7"
  },
  {
    "url": "assets/js/6.da38db82.js",
    "revision": "cdad5f34f756fae3cf9d6cde587ce2f2"
  },
  {
    "url": "assets/js/app.e7d5f631.js",
    "revision": "6910e78bcf80fd24b2e5ceb638b149ec"
  },
  {
    "url": "guide/index.html",
    "revision": "ed7fe536cbef793a0026f0dd73a3425b"
  },
  {
    "url": "index.html",
    "revision": "5b9374baf0b79066560372c0b2701186"
  },
  {
    "url": "logo.png",
    "revision": "cf23526f451784ff137f161b8fe18d5a"
  },
  {
    "url": "zh/guide/index.html",
    "revision": "dacfe43b49c66cb98fefc17c5eaeaedd"
  },
  {
    "url": "zh/index.html",
    "revision": "d6681cff96654358b200c16afccb3ea2"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
