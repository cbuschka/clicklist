import './song-list.css';
import {selectSong} from "./select-song-action.js";
import {List, ListItem} from "./list";

const Item = ({song, onSongSelect, selected}) => {
    const selectSong = (ev) => {
        onSongSelect(song);
    };
    return <ListItem className="SongList__Item" selected={selected === true}
                     onClick={selectSong}>
        <div>{song.title || "???"} | <span
            className="SongList__Item_bpm">{song.bpm || ""}</span></div>
    </ListItem>
}

export const SongList = ({songs, selectedSong}) => {
    return <div className="SongList">
        <div className="SongList__ScrollPane">
            <List className="SongList__List">{songs.map((song => {
                return <Item key={song.id} song={song} selected={selectedSong === song} onSongSelect={selectSong}/>;
            }))}</List>
        </div>
    </div>;
}