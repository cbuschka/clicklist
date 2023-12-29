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

    setSong(song) {
        this.song = song;
    }

    play(twelveletNumber) {
        if (Math.abs(twelveletNumber) % 12 !== 0) {
            return;
        }

        const beat = Math.floor(Math.abs(twelveletNumber / 12)) * Math.sign(twelveletNumber);

        const parts = this.song.getPartsFor(beat).filter(part => part.type === "announcement" && part.title);
        if (parts.length > 0) {
            const part = parts[0];
            console.log("speaking for beat %o: %o", beat, part)
            const utterThis = new SpeechSynthesisUtterance(part.title);
            utterThis.voice = this.voice;
            utterThis.pitch = 1;
            utterThis.rate = 1.1;
            this.synth.speak(utterThis);
        }
    }
}