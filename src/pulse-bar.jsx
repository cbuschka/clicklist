import './pulse-bar.css';
import {Pulse} from "./pulse";
import classNames from "classnames";

export const PulseBar = ({beatInBar, beatsPerBar, className}) => {
    return <div className={classNames("PulseBar", className)}>
        {[...Array(beatsPerBar).keys()].map((i) => {
            return <Pulse key={i} active={beatInBar === i}/>
        })}
    </div>
        ;
};