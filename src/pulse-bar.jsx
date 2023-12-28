import './pulse-bar.css';
import {Pulse} from "./pulse";
import {useEffect, useState} from "react";

export const PulseBar = ({metronome, selectedSong}) => {
    const n = selectedSong ? selectedSong.beatsPerBar : 0;
    const [active, setActive] = useState(-1);
    useEffect(() => {
        if (!metronome) {
            return () => {
            }
        }
        const listener = (ev) => {
            if (ev.type === "tick" && ev.data && n > 0) {
                const newActive = Math.floor(ev.data.beatNumber / 12);
                setActive(newActive);
            }
        };
        metronome.addListener(listener);
        return () => {
            metronome.removeListener(listener);
        }
    }, [metronome, selectedSong]);

    return <div className="PulseBar">{
        [...Array(n).keys()].map((i) => {
            return <Pulse key={i} active={active === i}/>
        })
    }
    </div>;
};