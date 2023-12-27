import {dispatcher} from "@cbuschka/flux";
import {Metronome} from "./metronome.js";

const SONGS = [
    {"id": "a58b2f43-9836-4a71-9cb0-ed64286e3561", "title": "Das System", "bpm": 140, "beatsPerBar": 4},
    {"id": "7a04fb32-4a3a-4ec2-b07e-90749fdf9279", "title": "Unsere Zeit", "bpm": 130, "beatsPerBar": 4},
    {"id": "72900673-21e9-4dbc-862b-be00cc792bfa", "title": "Spacko", "bpm": 140, "beatsPerBar": 4},
    {"id": "041efb48-9e04-4ef0-bfa9-23fddaa6f2b6", "title": "Hey Junge", "bpm": 140, "beatsPerBar": 4},
    {"id": "5c08c5d9-404f-4aaa-b350-1d52d2a26a15", "title": "Jeder gegen Jeden", "bpm": 140, "beatsPerBar": 4},
    {"id": "39f91fd3-7429-45fd-8229-41f054468f0d", "title": "Getrennte Wege", "bpm": 90, "beatsPerBar": 4},
    {"id": "2e68bcc2-b206-4304-83a3-715f154be58d", "title": "Märchenwelt", "bpm": 150, "beatsPerBar": 4},
    {"id": "c34dfc31-1723-467d-9324-2c23fbef615c", "title": "Hochseil", "bpm": 170, "beatsPerBar": 4},
    {"id": "fbdd3e43-1952-41cd-bbb5-3e7f5cce3a87", "title": "Facebook", "bpm": 140, "beatsPerBar": 4},
    {"id": "9831fb37-f70f-4a39-8bd7-5b7edf4a4718", "title": "Seit jenem März", "bpm": 140, "beatsPerBar": 4},
    {"id": "a9b96d21-4615-457d-9f0c-16689f926c14", "title": "Alkohol", "bpm": 120, "beatsPerBar": 4},
    {"id": "42afdafe-e8e3-46a9-bf22-24ff2a95a69a", "title": "Morgen", "bpm": 130, "beatsPerBar": 4},
    {"id": "05c51a4b-a8e7-43a6-aa17-d2793d2c83b4", "title": "Wahre Freunde", "bpm": 150, "beatsPerBar": 4},
    {"id": "30ec5e23-d8f2-455e-96da-e25451c8824c", "title": "Droge", "bpm": 150, "beatsPerBar": 4},
    {"id": "99d3447d-62ce-465d-ba3a-f585ec73c568", "title": "Nein", "bpm": 150, "beatsPerBar": 4},
    {"id": "da84df25-94b3-4939-b180-ba0bcc23d232", "title": "Katalog S.8", "bpm": 140, "beatsPerBar": 4},
    {"id": "fe2377ae-0a51-4a0f-9c3b-0494b927b238", "title": "Freitag, der 13.", "bpm": 140, "beatsPerBar": 4}
    // Popkommerz 140
    // In diesem Moment
];


class AppModel {
    constructor() {
        this.metronome = new Metronome();
        this.selectedSong = null;
        this.songs = JSON.parse(JSON.stringify(SONGS));
    }

    onSongSelected = ({data: {song}}) => {
        if (this.selectedSong !== song) {
            this.selectedSong = song;
            if (!!this.selectedSong) {
                this.metronome.setTempo(this.selectedSong.bpm);
                this.metronome.play();
            }
        }
    }

    onStartPlaying = (ev) => {
        console.log("Starting metronome...");
        if (!this.selectedSong) {
            return;
        }

        this.metronome.setTempo(this.selectedSong.bpm);
        this.metronome.play();
    }

    onStopPlaying = (ev) => {
        console.log("Stopping metronome...");
        this.metronome.stop();
    }

    appendDataTo(target) {
        target["songList"] = {songs: this.songs, selectedSong: this.selectedSong};
        target["app"] = {
            metronome: this.metronome,
            playing: (this.metronome.getStatus() === "playing"),
            canStartPlaying: (this.metronome.getStatus() !== "playing" && !!this.selectedSong),
            canStopPlaying: (this.metronome.getStatus() === "playing")
        };
    }
}

dispatcher.addHandler(new AppModel());