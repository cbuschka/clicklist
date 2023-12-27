import './pulse-bar.css';
import {Pulse} from "./pulse";

export const PulseBar = ({metronome, selectedSong}) => {
    return <div className="PulseBar">{
        [...Array(selectedSong ? selectedSong.beatsPerBar : 0).keys()].map((i) => {
            return <Pulse key={i} metronome={metronome}/>
        })
    }
    </div>;
};