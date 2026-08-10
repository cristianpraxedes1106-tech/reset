const CACHE_NAME =
    "reset-app-v1";


const FILES = [

    "./",

    "./index.html",

    "./css/style.css",

    "./css/animations.css",

    "./js/app.js",

    "./js/state.js",

    "./js/missions.js",

    "./js/ui.js",

    "./js/sounds.js",

    "./manifest.json"

];


self.addEventListener(
    "install",
    event => {

        event.waitUntil(

            caches
                .open(CACHE_NAME)
                .then(cache => {

                    return cache.addAll(
                        FILES
                    );

                })

        );

    }
);


self.addEventListener(
    "activate",
    event => {

        event.waitUntil(

            caches.keys()
                .then(keys => {

                    return Promise.all(

                        keys
                            .filter(
                                key =>
                                    key !==
                                    CACHE_NAME
                            )
                            .map(
                                key =>
                                    caches.delete(
                                        key
                                    )
                            )

                    );

                })

        );

    }
);


self.addEventListener(
    "fetch",
    event => {

        event.respondWith(

            caches
                .match(
                    event.request
                )
                .then(cached => {

                    return (
                        cached ||
                        fetch(
                            event.request
                        )
                    );

                })

        );

    }
);
