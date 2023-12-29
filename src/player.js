import {metronome} from "./metronome";
import {speaker} from "./speaker.js";
import {isNumber} from "./type-util";

export class Player {
    constructor(metronome) {
        this.metronome = metronome;
        this.metronome.addListener(this.onMetronome);

        this.song = undefined;
        this.previousPart = {type: "part", title: "Song"};
        this.beatInPart = 0;

        this.speaker = speaker;
        this.listeners = [];
    }

    addListener(l) {
        this.listeners.push(l);
    }

    removeListener(l) {
        const index = this.listeners.indexOf(l);
        this.listeners.splice(index, 1);
    }

    setSong(song) {// stop playing?
        this.song = song;
        this.previousPart = {type: "part", title: "Song"};
        this.speaker.setSong(song);
        this.metronome.setTempo(song.bpm);
        this.beatInPart = 0;
    }

    isPlaying() {
        return this.metronome.getStatus() === "playing";
    }

    startPlaying() {
        if (!this.song) {
            return;
        }

        this.metronome.play();
    }

    stopPlaying() {
        if (!this.isPlaying()) {
            return;
        }

        this.metronome.stop();
    }

    fireEvent = (ev) => {
        this.listeners.forEach(l => l(ev));
    }

    onMetronome = (ev) => {
        if (ev.type === "start") {
            this.fireEvent({type: "start"});
        } else if (ev.type === "stop") {
            this.fireEvent({type: "stop"});
        } else if (ev.type === "tick") {
            const {twelveletNumber, time} = ev.data;
            // const isCountIn = twelveletNumber < 0;
            const beatsPerBar = this.song.beatsPerBar;
            const twelveletNumberAlwaysPositive = twelveletNumber < 0 ? (12 * beatsPerBar * 2) + twelveletNumber : twelveletNumber;
            const isBeat = twelveletNumberAlwaysPositive % 12 === 0;
            if (isBeat) {
                this.beatInPart++;
                const beatAlwaysPositive = Math.floor(twelveletNumberAlwaysPositive / 12)
                const beatInBar = beatAlwaysPositive % beatsPerBar;
                const bar = Math.floor(beatAlwaysPositive / this.song.beatsPerBar);

                const beat = Math.floor(Math.abs(twelveletNumber / 12)) * Math.sign(twelveletNumber);
                const parts = this.song.getPartsFor(beat).filter(part => part.type === "part" && part.title);
                if (parts.length > 0) {
                    this.previousPart = parts[0];
                    this.beatInPart = 0;
                }
                const barInPart = Math.floor(this.beatInPart / beatsPerBar);
                const [title, barTitle] = (() => {
                    if (twelveletNumber < 0) {
                        return ["Counting in...", `${bar + 1}/2`];
                    }

                    if (this.previousPart && isNumber(barInPart) && isNumber(this.previousPart.lengthInBars)) {
                        return [`${this.previousPart.title}`, `${barInPart + 1}/${this.previousPart.lengthInBars}`];
                    }

                    if (this.previousPart) {
                        return [this.previousPart.title, ""];
                    }

                    return ["", ""];
                })();

                this.fireEvent({
                    type: "tick",
                    data: {
                        twelveletNumber,
                        time,
                        beatInBar,
                        beatsPerBar,
                        beat: beatAlwaysPositive,
                        bar,
                        title,
                        barTitle
                    }
                });

                this.speaker.play(twelveletNumber);
            }
        } else {
            console.log("Unknown metronome event %o: %o", ev.type, ev);
        }
    }
}

export const player = new Player(metronome);