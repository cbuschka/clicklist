import {dispatcher} from "@cbuschka/flux";

export const updateView = () => {
    dispatcher.dispatch({
        "type": "updateViewAction"
    });
}