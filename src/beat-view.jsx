import './beat-view.css';
import {useEffect, useState} from "react";

export const BeatView = ({metronome, selectedSong}) => {
    const beatsPerBar = selectedSong ? selectedSong.beatsPerBar : 0;
    const [message, setMessage] = useState("");
    useEffect(() => {
        if (!metronome) {
            return () => {
            }
        }
        const listener = (ev) => {
            if (ev.type === "tick" && ev.data && beatsPerBar > 0) {
                if (ev.data.twelveletNumber < 0 && Math.abs(ev.data.twelveletNumber) % 12 === 0) {
                    setMessage("Count in...")
                } else if (ev.data.twelveletNumber >= 0 && ev.data.twelveletNumber % 12 === 0) {
                    const bar = Math.floor(ev.data.twelveletNumber / 12 / beatsPerBar);
                    setMessage(`Bar ${bar + 1}`);
                }
            } else {
                setMessage("");
            }
        };
        metronome.addListener(listener);
        return () => {
            metronome.removeListener(listener);
        }
    }, [metronome, selectedSong]);


    return <div className="BeatView">
        {message}
    </div>;
};