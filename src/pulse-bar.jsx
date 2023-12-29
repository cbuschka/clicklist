import './pulse-bar.css';
import {Pulse} from "./pulse";
import {useEffect, useState} from "react";

export const PulseBar = ({metronome, selectedSong}) => {
    const beatsPerBar = selectedSong ? selectedSong.beatsPerBar : 0;
    const [active, setActive] = useState(-1);
    useEffect(() => {
        if (!metronome) {
            return () => {
            }
        }
        const listener = (ev) => {
            if (ev.type === "tick" && ev.data && beatsPerBar > 0) {
                const twelveletNumber = ev.data.twelveletNumber < 0 ? (12 * beatsPerBar * 2) + ev.data.twelveletNumber : ev.data.twelveletNumber;
                const beat = Math.floor(twelveletNumber / 12)
                const newActive = beat % beatsPerBar;
                setActive(newActive);
            }
        };
        metronome.addListener(listener);
        return () => {
            metronome.removeListener(listener);
        }
    }, [metronome, selectedSong]);

    return <div className="PulseBar">
        {[...Array(beatsPerBar).keys()].map((i) => {
            return <Pulse key={i} active={active === i}/>
        })}
    </div>
        ;
};