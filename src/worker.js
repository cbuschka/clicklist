let timerId = null;
let interval = 100;

const sendTick = () => {
    // console.log("[worker] workerTick");
    postMessage("workerTick");
}

self.onmessage = function (e) {
    if (e.data === "start") {
        console.log("[worker] starting");
        if (timerId) {
            console.log("[worker] cleaning up timer before start");
            clearInterval(timerId);
        }
        timerId = setInterval(() => {
            sendTick();
        }, interval);
        console.log("[Worker] started (interval=%o)", interval);
    } else if (e.data.interval) {
        console.log("[worker] setting interval");
        interval = e.data.interval;
        console.log("[worker] interval=" + interval);
        if (timerId) {
            clearInterval(timerId);
            timerId = setInterval(function () {
                sendTick();
            }, interval);
        }
    } else if (e.data === "stop") {
        console.log("[Worker] stopping");
        clearInterval(timerId);
        timerId = null;
        console.log("[Worker] stopped");
    }
};

postMessage('workerLoaded');
