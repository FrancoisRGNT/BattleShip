let sleeping = (function () {

    function wait(time) {
        const date = Date.now();
        let currentDate = null;
        do {
            currentDate = Date.now();
        } while (currentDate - date < time);

    }

    return {
        sleep(time) {
            wait(time);
        }
    }
})();