import "./App.css";
import { useEffect, useState } from "react";
import DragSleepingPika from "./DragSleepingPika";
import Peek from "./Peek";
import TwoCatsJoke from "./TwoCatsJoke";
import CatSong from "./CatSong";

export default function App() {
    const [currentJoke, setCurrentJoke] = useState(1);

    let joke;

    useEffect(() => {
        var now = new Date();
        var millisTill10 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 17, 22, 0, 0) - now;
        if (millisTill10 < 0) {
            millisTill10 += 86400000; // it's after 10am, try 10am tomorrow.
        }
        console.log("millisTill10", millisTill10)
        setTimeout(function () { alert("It's time!") }, millisTill10);
    }, [])

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
        </div>
    );
}