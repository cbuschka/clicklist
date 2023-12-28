import './anchor.css';
import classNames from "classnames";

const noop = () => {
};

export const Anchor = ({children, onClick = noop, className = ""}) => {
    return <a className={classNames("Anchor", className)} href="#" onClick={onClick}>{children}</a>
}