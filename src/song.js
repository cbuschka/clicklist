export class Song {
    constructor(data) {
        this.id = data["id"];
        this.title = data["title"];
        this.bpm = data["bpm"];
        this.beatsPerBar = data["beatsPerBar"];

        this.partsByBeat = {};
        let nextStartInBeats = 0;
        (data.parts || []).forEach((part) => {
            part.type = "part";
            const startInBeats = nextStartInBeats;
            const startModInBeats = -(this.beatsPerBar - 2);
            this.partsByBeat[startInBeats + startModInBeats] = this.partsByBeat[startInBeats + startModInBeats] || [];
            this.partsByBeat[startInBeats + startModInBeats].push({"type": "announcement", "title": part.title});
            this.partsByBeat[startInBeats] = this.partsByBeat[startInBeats] || [];
            this.partsByBeat[startInBeats].push(part);
            nextStartInBeats = nextStartInBeats + (part.lengthInBars * this.beatsPerBar);
        });
    }

    getPartsFor(beat) {
        return this.partsByBeat[beat] || [];
    }

}