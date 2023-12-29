import './pulse-bar.css';
import {Pulse} from "./pulse";

export const PulseBar = ({beatInBar, beatsPerBar}) => {
    return <div className="PulseBar">
        {[...Array(beatsPerBar).keys()].map((i) => {
            return <Pulse key={i} active={beatInBar === i}/>
        })}
    </div>
        ;
};