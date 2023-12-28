import './button-bar.css'
import classNames from "classnames";

const noop = () => {
};

export const ButtonBar = ({children}) => {
    return <div className="ButtonBar">{children}</div>;
}

ButtonBar.Button = ({onClick = noop, children, disabled}) => {
    return <button className={classNames("ButtonBar__Button", disabled === true ? "ButtonBar__Button_disabled" : null)}
                   disabled={disabled} onClick={onClick}>{children}</button>;
}