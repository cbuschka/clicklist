import {dispatcher} from "@cbuschka/flux";

export const updatePlayingProgress = ({twelveletNumber, time, beatInBar, beatsPerBar, beat, bar, title}) => {
    dispatcher.dispatch({
        "type": "updatePlayingProgress",
        data: {twelveletNumber, time, beatInBar, beatsPerBar, beat, bar, title}
    });
}