import {dispatcher} from "@cbuschka/flux";

export const stopPlaying = (ev) => {
    dispatcher.dispatch({"type": "stopPlaying"});
}