import './beat-view.css';
import {useEffect, useState} from "react";

export const BeatView = ({metronome, selectedSong}) => {
    const beatsPerBar = selectedSong ? selectedSong.beatsPerBar : 0;
    const [bar, setBar] = useState(0);
    const [title, setTitle] = useState("");

    const [beatState, setBeatState] = useState({beat: 0, bar: 0, title: ""});
    useEffect(() => {
        if (!metronome) {
            return () => {
            }
        }
        const listener = (ev) => {
            if (ev.type === "tick" && ev.data && beatsPerBar > 0) {
                if (ev.data.twelveletNumber < 0 && Math.abs(ev.data.twelveletNumber) % 12 === 0) {
                    setTitle("Counting in...");
                } else if (ev.data.twelveletNumber >= 0 && ev.data.twelveletNumber % 12 === 0) {
                    const bar = Math.floor(ev.data.twelveletNumber / 12 / beatsPerBar);
                    setBar(bar);
                    const beat = Math.floor(ev.data.twelveletNumber / 12);

                    selectedSong.getPartsFor(beat)
                        .filter(part => part.type === "part" && part.title)
                        .forEach(part => {
                            console.log("part seen %o", part);
                            setTitle(part.title);
                        });
                }
            }
        };
        metronome.addListener(listener);
        return () => {
            metronome.removeListener(listener);
        }
    }, [metronome, selectedSong]);

    return <div className="BeatView">
        <div className="BeatView__bar">Bar #{bar + 1}</div>
        <div className="BeatView__title">{title}</div>
    </div>;
};