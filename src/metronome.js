const MIN_TEMPO = 20;
const MAX_TEMPO = 400;

export class Metronome {

    constructor() {
        this.status = "stopped";
        this.listeners = [];
        this.audioContext = null;
        this.startTime = null;
        this.currentTwelveletNote;
        this.tempo = 120.0; // rename to tempoBPM
        this.meter = 4;
        this.masterVolume = 0.25;
        this.accentVolume = 1;
        this.quarterVolume = 0.75;
        this.eighthVolume = 0;
        this.sixteenthVolume = 0;
        this.tripletVolume = 0;
        this.lookahead = 25.0; // rename to scheduleDelayInMillis
        this.scheduleAheadTime = 0.1;   // How far ahead to schedule audio (sec)
// This is calculated from lookahead, and overlaps
// with next interval (in case the timer is late)
        this.nextNoteTime = 0.0;     // when the next note is due.
        this.noteLength = 0.05;      // length of "beep" (in seconds)
        this.timerWorker = new Worker(
            new URL('./worker', import.meta.url), {}
        );

        this.timerWorker.onmessage = (e) => {
            if (e.data === "workerTick") {
                this.scheduler();
            } else {
                console.log("Ignored message: %o", e.data);
            }
        };

        this.timerWorker.postMessage({"interval": this.lookahead});
    };

    addListener(l) {
        this.listeners.push(l);
    }

    removeListener(l) {
        const index = this.listeners.indexOf(l);
        this.listeners.splice(index, 1);
    }

    maxBeats = () => {
        return (this.meter * 12);
    }

    nextTwelvelet = () => {
        const secondsPerBeat = 60.0 / this.tempo;
        this.nextNoteTime += 0.08333 * secondsPerBeat;    // Add beat length to last beat time
        this.currentTwelveletNote++;    // Advance the beat number, wrap to zero

        if (this.currentTwelveletNote === this.maxBeats()) {
            this.currentTwelveletNote = 0;
        }
    }

    calcVolume = (beatVolume) => {
        return (beatVolume * this.masterVolume);
    }

    getStatus() {
        return this.status;
    }

    play() {
        if (!this.audioContext) {
            this.audioContext = new AudioContext();
        }

        this.status = "playing";

        this.currentTwelveletNote = 0;
        this.nextNoteTime = this.audioContext.currentTime;
        this.timerWorker.postMessage("start");

        this.fireEvent({type: "start"});
    }

    scheduleNote = (beatNumber, time) => {

        // create oscillator & gainNode & connect them to the context destination
        var osc = this.audioContext.createOscillator();
        var gainNode = this.audioContext.createGain();

        osc.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        if (beatNumber % this.maxBeats() === 0) {
            if (this.accentVolume > 0.25) {
                osc.frequency.value = 880.0;
                gainNode.gain.value = this.calcVolume(this.accentVolume);
            } else {
                osc.frequency.value = 440.0;
                gainNode.gain.value = this.calcVolume(this.quarterVolume);
            }
        } else if (beatNumber % 12 === 0) {   // quarter notes = medium pitch
            osc.frequency.value = 440.0;
            gainNode.gain.value = this.calcVolume(this.quarterVolume);
        } else if (beatNumber % 6 === 0) {
            osc.frequency.value = 440.0;
            gainNode.gain.value = this.calcVolume(this.eighthVolume);
        } else if (beatNumber % 4 === 0) {
            osc.frequency.value = 300.0;
            gainNode.gain.value = this.calcVolume(this.tripletVolume);
        } else if (beatNumber % 3 === 0) {                    // other 16th notes = low pitch
            osc.frequency.value = 220.0;
            gainNode.gain.value = this.calcVolume(this.sixteenthVolume);
        } else {
            gainNode.gain.value = 0;   // keep the remaining twelvelet notes inaudible
        }

        osc.start(time);
        osc.stop(time + this.noteLength);
        this.fireEvent({type: "tick", data: {beatNumber, time}});
    }

    scheduler = () => {
        while (this.nextNoteTime < this.audioContext.currentTime + this.scheduleAheadTime) {
            this.scheduleNote(this.currentTwelveletNote, this.nextNoteTime);
            this.nextTwelvelet();
        }
    }

    stop() {
        if (this.status !== "playing") {
            return;
        }

        this.timerWorker.postMessage("stop");
        this.status = "stopped";
        this.listeners.forEach(l => l({type: "stop"}));
    }

    setTempo(newTempoBPM) {
        this.tempo = Math.max(Math.min(newTempoBPM, MAX_TEMPO), MIN_TEMPO);
    }

    fireEvent = (ev) => {
        this.listeners.forEach(l => l(ev));
    }
}