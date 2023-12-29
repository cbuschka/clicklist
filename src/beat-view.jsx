import './beat-view.css';

export const BeatView = ({title, bar=""}) => {
    return <div className="BeatView">
        <div className="BeatView__title">{title}</div>
        <div className="BeatView__bar">{bar}</div>
    </div>;
};