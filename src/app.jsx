import './app.css'
import {dispatcher} from "@cbuschka/flux";
import './app-model.js';
import {SongList} from "./song-list";
import {useEffect, useState} from "react";
import {startPlaying} from "./start-playing-action.js";
import {stopPlaying} from "./stop-playing-action.js";
import {AppFrame} from "./app-frame";
import {ButtonBar} from "./button-bar";
import {FaCirclePlay, FaCircleStop} from "react-icons/fa6";
import {PulseBar} from "./pulse-bar";
import {Title} from "./title";
import {ReloadPrompt} from "./reload-prompt.jsx";
import {BeatView} from "./beat-view.jsx";

export function App() {
    const [appState, setAppState] = useState({
        canStartPlaying: false,
        canStopPlaying: false
    });
    const [playState, setPlayState] = useState({
        beat: 0,
        bar: 0,
        title: "",
        beatInBar: 0,
        beatsPerBar: 0
    });
    const [songs, setSongs] = useState([])
    const [selectedSong, setSelectedSong] = useState(null)
    useEffect(() => {
        const listener = (ev) => {
            const {data: {songList: {songs, selectedSong}, appState, playState}} = ev;
            setSongs(songs);
            setSelectedSong(selectedSong);
            setAppState({...appState});
            setPlayState({...playState});
        }
        dispatcher.subscribe(listener);
        return () => {
            dispatcher.unsubscribe(listener);
        };
    }, [dispatcher]);

    const {canStartPlaying, canStopPlaying} = appState;
    const {barTitle, title, beatsPerBar, beatInBar} = playState;

    return <div className="App">
        <AppFrame>
            <AppFrame.Top>
                <Title text="ClickList"/>
            </AppFrame.Top>
            <AppFrame.Body>
                <SongList songs={songs} selectedSong={selectedSong}/>
            </AppFrame.Body>
            <AppFrame.Bottom>
                <BeatView bar={barTitle} title={title}/>
                <PulseBar beatsPerBar={beatsPerBar} beatInBar={beatInBar}/>
                <ButtonBar>
                    <ButtonBar.Button color="green"
                                      disabled={canStartPlaying !== true}
                                      onClick={startPlaying}><FaCirclePlay/></ButtonBar.Button>
                    <ButtonBar.Button color="red"
                                      disabled={canStopPlaying !== true}
                                      onClick={stopPlaying}><FaCircleStop/></ButtonBar.Button>
                </ButtonBar>
            </AppFrame.Bottom>
        </AppFrame>
        <ReloadPrompt/>
    </div>;
}