import "./AprilFools.css";
import React, { useEffect, useState } from "react";
import DragSleepingPika from "./DragSleepingPika";
import Peek from "./Peek";
import TwoCatsJoke from "./TwoCatsJoke";
import CatSong from "./CatSong";

export default function AprilFools() {
    const [currentJoke, setCurrentJoke] = useState(0);
    const [endOfCurrJoke, setEndOfCurrJoke] = useState(false)

    useEffect(() => {
        let timer: NodeJS.Timeout
        if (currentJoke === 0) {
            timer = setTimeout(() => {
                setCurrentJoke(prev => prev + 1)
            }, 5000)
        }
        return () => {
            clearTimeout(timer);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        console.log('currentJoke', currentJoke)
        console.log('end of current Joke', endOfCurrJoke)
        let timer: NodeJS.Timeout
        if (endOfCurrJoke && currentJoke !== 4) {
            timer = setTimeout(() => {
                setCurrentJoke(prev => prev + 1)
                setEndOfCurrJoke(false)
            }, 300000)
        }
        return () => {
            clearTimeout(timer);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [endOfCurrJoke])

    let joke;
    switch (currentJoke) {
        case 1:
            joke = <Peek setEndOfCurrJoke={setEndOfCurrJoke} />;
            break;
        case 2:
            joke = <TwoCatsJoke setEndOfCurrJoke={setEndOfCurrJoke} />;
            break;
        case 3:
            joke = <DragSleepingPika setEndOfCurrJoke={setEndOfCurrJoke} />;
            break;
        case 4:
            joke = <CatSong setEndOfCurrJoke={setEndOfCurrJoke} />;
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
