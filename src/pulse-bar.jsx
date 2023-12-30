import './pulse-bar.css';
import classNames from "classnames";

const Pulse = ({active}) => {
    return <div className="Pulse">
        <div className={classNames("Pulse__bubble", "yellow", active ? "active" : "")}></div>
    </div>;
}
export const PulseBar = ({beatInBar, beatsPerBar, className}) => {
    return <div className={classNames("PulseBar", className)}>
        {[...Array(beatsPerBar).keys()].map((i) => {
            return <Pulse key={i} active={beatInBar === i}/>
        })}
    </div>
        ;
};
