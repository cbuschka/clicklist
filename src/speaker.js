export class Speaker {
    constructor() {
        this.synth = window.speechSynthesis;

        const voices = this.synth.getVoices().sort(function (a, b) {
            const aname = a.name.toUpperCase();
            const bname = b.name.toUpperCase();

            if (aname < bname) {
                return -1;
            } else if (aname === bname) {
                return 0;
            } else {
                return +1;
            }
        });
        this.voice = voices[0];
        this.beatsPerBar = 1;
        this.partsByBeat = {};
    }

    setParts(parts, beatsPerBar) {
        this.beatsPerBar = beatsPerBar;
        const partsByBeat = {};
        let nextStartInBeats = 0;
        parts.forEach((part) => {
            const startInBeats = nextStartInBeats;
            const startModInBeats = part.early === true ? -(beatsPerBar - 2) : 0;
            partsByBeat[startInBeats + startModInBeats] = part;
            nextStartInBeats = nextStartInBeats + (part.lengthInBars * beatsPerBar);
        });
        console.log("parts changed %o", partsByBeat)
        this.partsByBeat = partsByBeat;
    }

    play(twelveletNumber) {
        if (Math.abs(twelveletNumber) % 12 !== 0) {
            return;
        }

        const beat = twelveletNumber < 0 ? Math.floor(((12 * this.beatsPerBar * 2) + twelveletNumber) / 12) * -1 : Math.floor(twelveletNumber / 12);

        const part = this.partsByBeat[beat];
        if (part && part.title) {
            console.log("speaking for beat %o: %o", beat, part)
            const utterThis = new SpeechSynthesisUtterance(part.title);
            utterThis.voice = this.voice;
            utterThis.pitch = 1;
            utterThis.rate = 1.1;
            this.synth.speak(utterThis);
        }

    }

    /*


    getStatus() {
        if (!this.synth) {
            return "unavailable";
        }
        if (this.synth.speaking) {
            return "speaking";
        }
    }
     */
}