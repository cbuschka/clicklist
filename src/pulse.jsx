import './pulse.css';
import {useEffect, useRef, useState} from "react";
import classNames from "classnames";

export const Pulse = ({metronome}) => {
    const blobRef = useRef();
    const [animating, setAnimating] = useState(false);

    useEffect(() => {
        if (!metronome) {
            return () => {
            }
        }
        const listener = (ev) => {
            if (ev.type === "tick" && ev.data) {
                setAnimating(ev.data && ev.data.beatNumber % 12 === 0);
            }
        };
        metronome.addListener(listener);
        return () => {
            metronome.removeListener(listener);
        }
    }, [metronome]);
    if (blobRef.current) {
        blobRef.current.addEventListener("animationend", (ev) => {
            setAnimating(false);
        }, false);
    }
    return <div className="Pulse">
        <div ref={blobRef} className={classNames("Pulse__bubble", "yellow", animating ? "animating" : "")}></div>
    </div>;
}