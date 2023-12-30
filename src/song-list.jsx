import './song-list.css';
import {selectSong} from "./select-song-action.js";
import {List, ListItem} from "./list";
import classNames from "classnames";

const Item = ({song, onSongSelect, selected}) => {
    const selectSong = (ev) => {
        onSongSelect(song);
    };
    return <ListItem className="SongList__Item" selected={selected === true}
                     onClick={selectSong}>
        <span className="SongList__Item_title">{song.title || "???"}</span>
        <span className="SongList__Item_bpm">{song.bpm || ""}</span>
    </ListItem>
}

export const SongList = ({songs, selectedSong, className}) => {
    return <div className={classNames("SongList", className)}>
        <List className="SongList__List">{songs.map((song => {
            return <Item key={song.id} song={song} selected={selectedSong === song} onSongSelect={selectSong}/>;
        }))}</List>
    </div>;
}