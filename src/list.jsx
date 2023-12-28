import './list.css'
import classNames from "classnames";

export const List = ({children}) => {
    return <ul className="List">{children}</ul>;
}

export const ListItem = ({onClick, key, selected, children, className}) => {
    return <li key={key} className={classNames(className, "List__Item", selected ? "List__Item_selected" : "")}
               onClick={onClick}>{children}</li>;
}

