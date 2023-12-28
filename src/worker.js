let timerId = null;
let interval = 100;

const sendTick = () => {
    postMessage("workerTick");
}

self.onmessage = function (e) {
    if (e.data === "start") {
        console.log("[Worker] Starting...");
        if (timerId) {
            clearInterval(timerId);
        }
        timerId = setInterval(() => {
            sendTick();
        }, interval);
        console.log("[Worker] started (interval=%o)", interval);
    } else if (e.data.interval) {
        interval = e.data.interval;
        console.log("[Worker] Changed interval=" + interval);
        if (timerId) {
            clearInterval(timerId);
            timerId = setInterval(function () {
                sendTick();
            }, interval);
        }
    } else if (e.data === "stop") {
        console.log("[Worker] Stopping");
        clearInterval(timerId);
        timerId = null;
        console.log("[Worker] Stopped");
    }
};

postMessage('workerLoaded');
