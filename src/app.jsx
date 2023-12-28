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

export function App() {
    const [appState, setAppState] = useState({metronome: null, canStartPlaying: false, canStopPlaying: false})
    const [songs, setSongs] = useState([])
    const [selectedSong, setSelectedSong] = useState(null)
    useEffect(() => {
        const listener = (ev) => {
            const {data: {songList: {songs, selectedSong}, app: appState}} = ev;
            setSongs(songs);
            setSelectedSong(selectedSong);
            setAppState(appState);
        }
        dispatcher.subscribe(listener);
        return () => {
            dispatcher.unsubscribe(listener);
        };
    }, [dispatcher]);


    const {metronome, canStartPlaying, canStopPlaying} = appState;

    return <div className="App">
        <AppFrame>
            <AppFrame.Top>
                <Title text="ClickList"/>
            </AppFrame.Top>
            <AppFrame.Body>
                <SongList songs={songs} selectedSong={selectedSong}/>
            </AppFrame.Body>
            <AppFrame.Bottom>
                <PulseBar metronome={metronome} selectedSong={selectedSong}/>
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