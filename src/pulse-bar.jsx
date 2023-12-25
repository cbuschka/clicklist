import './pulse-bar.css';
import {Pulse} from "./pulse";

export const PulseBar = ({metronome}) => {
    return <div className="PulseBar">
        <Pulse metronome={metronome}/>
        <Pulse metronome={metronome}/>
        <Pulse metronome={metronome}/>
        <Pulse metronome={metronome}/>
    </div>;
};