import {dispatcher} from "@cbuschka/flux";

export const selectSong = (song) => {
    dispatcher.dispatch({"type": "songSelected", data: {song}});
}