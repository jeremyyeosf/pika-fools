import "./App.css";
import { useState } from "react";
import DragSleepingPika from "./DragSleepingPika";
import Peek from "./Peek";
import TwoCatsJoke from "./TwoCatsJoke";
import CatSong from "./CatSong";

export default function App() {
    const [currentJoke, setCurrentJoke] = useState(1);

    let joke;

    switch (currentJoke) {
        case 1:
            joke = <Peek />;
            break;
        case 2:
            joke = <TwoCatsJoke />;
            break;
        case 3:
            joke = <DragSleepingPika />;
            break;
        case 4:
            joke = <CatSong />;
            break;
        default:
            joke = null
            break;
    }

    function changeJoke() {
        if (currentJoke !== 5) {
            setCurrentJoke(prev => prev + 1)
        }
    }

    return (
        <div className="page">
            <button onClick={changeJoke}>change joke</button>
            {joke}
            {/* <Peek />
            <DragSleepingPika />
            <TwoCatsJoke />
            <CatSong /> */}
        </div>
    );
}
