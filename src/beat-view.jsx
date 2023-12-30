import './beat-view.css';
import classNames from "classnames";

export const BeatView = ({title, bar = "", className}) => {
    return <div className={classNames("BeatView", className)}>
        <div className="BeatView__title">{title}</div>
        <div className="BeatView__bar">{bar}</div>
    </div>;
};