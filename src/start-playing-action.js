import {dispatcher} from "@cbuschka/flux";

export const startPlaying = (ev) => {
    dispatcher.dispatch({"type": "startPlaying"});
}