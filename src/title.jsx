import './title.css';
import classNames from "classnames";

export const Title = ({text = "", className}) => {
    return <div className={classNames("Title", className)}>
        {text}
    </div>;
};