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
    }

    setParts(parts, beatsPerBar) {
        const partsByBeat = {};
        parts.forEach((part) => {
            const startBeat = part.bar * 12 * beatsPerBar;
            const startMod = part.early === true ? -(beatsPerBar * 12 / 2) : 0;
            console.log("startBar %o startBeat %o startMod %o result ", part.bar, startBeat, startMod, Math.max(0, startBeat + startMod))
            partsByBeat[Math.max(0, startBeat + startMod)] = part;
        });
        console.log("parts changed %o", partsByBeat)
        this.partsByBeat = partsByBeat;
    }

    play(twelveletNumber) {
        const part = this.partsByBeat[twelveletNumber];
        if (part && part.title) {
            console.log("#%o: %o", twelveletNumber, part)
            const utterThis = new SpeechSynthesisUtterance(part.title);
            utterThis.voice = this.voice;
            // utterThis.pitch = 10;
            // utterThis.rate = 100;
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