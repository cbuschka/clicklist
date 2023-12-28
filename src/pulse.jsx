import './pulse.css';
import classNames from "classnames";

export const Pulse = ({active}) => {
    return <div className="Pulse">
        <div className={classNames("Pulse__bubble", "yellow", active ? "active" : "")}></div>
    </div>;
}