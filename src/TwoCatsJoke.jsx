import React, { useEffect, useRef, useState } from 'react'
import twoCats from "./assets/two-cats-cropped.png"
import './TwoCatsJoke.css'
import cuteMeow from "./assets/cute-meow.wav";
import cuteMeowHigher from "./assets/cute-meow-higherpitched.wav";

export default function TwoCatsJoke() {
    const [speechCounter, setSpeechCounter] = useState(0)
    const [isShowCats, setIsShowCats] = useState(true)
    const pikaAudioRef = useRef(null);
    const jaymeeAudioRef = useRef(null);

    useEffect(() => {
        if (speechCounter === 14) {
            byeCats()
        }
    }, [speechCounter])

    function byeCats() {
        setTimeout(() => {
            setIsShowCats(false)
        }, 3000)
    }

    function catsTalk() {
        // console.log('speech counter', speechCounter)
        switch (speechCounter) {
            case 0:
            case 4:
            case 6:
                setSpeechCounter(prevState => prevState + 1)
                if (pikaAudioRef.current) {
                    pikaAudioRef.current.load()
                    pikaAudioRef.current.play()
                }
                break;
            case 2:
            case 3:
            case 5:
            case 7:
            case 10:
            case 11:
            case 12:
                setSpeechCounter(prevState => prevState + 1)
                break;
            case 1:
            case 13:
                setSpeechCounter(prevState => prevState + 1)
                if (jaymeeAudioRef.current) {
                    jaymeeAudioRef.current.load()
                    jaymeeAudioRef.current.play()
                }
                break;
            case 9:
                setSpeechCounter(prevState => prevState + 2)
                break;
            default:
                break;
        }
    }

    function clickYes() {
        setSpeechCounter(prevState => prevState + 1)
        if (pikaAudioRef.current) {
            pikaAudioRef.current.load()
            pikaAudioRef.current.play()
        }
    }

    function clickNo() {
        setSpeechCounter(prevState => prevState + 2)
        if (jaymeeAudioRef.current) {
            jaymeeAudioRef.current.load()
            jaymeeAudioRef.current.play()
        }
    }

    return (
        <div>
            {isShowCats
                ?
                <>
                    <div>Speech Counter: {speechCounter}</div>
                    <div>
                        <div id="thought-parent-pika" style={{ display: speechCounter === 1 ? "block" : "none" }}>
                            <div className="thought-pika">Hey Jaymee.</div>
                        </div>
                        <div id="thought-parent-jaymee" style={{ display: speechCounter === 2 ? "block" : "none" }}>
                            <div className="thought-jaymee">Yes Pika?</div>
                        </div>
                        <div id="thought-parent-pika" style={{ display: speechCounter === 3 ? "block" : "none" }}>
                            <div className="thought-pika">Why are cats great singers?</div>
                        </div>
                        <div id="thought-parent-jaymee" style={{ display: speechCounter === 4 ? "block" : "none" }}>
                            <div className="thought-jaymee">Why Pika?</div>
                        </div>
                        <div id="thought-parent-pika" style={{ display: speechCounter === 5 ? "block" : "none" }}>
                            <div className="thought-pika">Because they're very<i>&nbsp;mewsical</i>!</div>
                        </div>
                        <div id="thought-parent-jaymee" style={{ display: speechCounter === 6 ? "block" : "none" }}>
                            <div className="thought-jaymee">Omg lame Pika..</div>
                        </div>
                        <div id="thought-parent-pika" style={{ display: speechCounter === 7 ? "block" : "none" }}>
                            <div className="thought-pika">Hmph! Well at least I know Human appreciates the joke.</div>
                        </div>
                        <div id="thought-parent-pika" style={{ display: speechCounter === 8 ? "block" : "none" }}>
                            <div className="thought-pika">Right Human?<br /><button onClick={clickYes}>Yes</button>
                                <button onClick={clickNo}>Nope</button></div>
                        </div>
                        <div id="thought-parent-pika" style={{ display: speechCounter === 9 ? "block" : "none" }}>
                            <div className="thought-pika">See, Human agrees with me.</div>
                        </div>
                        <div id="thought-parent-jaymee" style={{ display: speechCounter === 10 ? "block" : "none" }}>
                            <div className="thought-jaymee">See, Human agrees with me.</div>
                        </div>
                        <div id="thought-parent-pika" style={{ display: speechCounter === 11 ? "block" : "none" }}>
                            <div className="thought-pika">*yawn* I'm getting tired...</div>
                        </div>
                        <div id="thought-parent-jaymee" style={{ display: speechCounter === 12 ? "block" : "none" }}>
                            <div className="thought-jaymee">*yawn* Me too...</div>
                        </div>
                        <div id="thought-parent-pika" style={{ display: speechCounter === 13 ? "block" : "none" }}>
                            <div className="thought-pika">Let's go take a nap.</div>
                        </div>
                        <div id="thought-parent-jaymee" style={{ display: speechCounter === 14 ? "block" : "none" }}>
                            <div className="thought-jaymee">Good idea.</div>
                        </div>
                    </div>
                    <img
                        id="twoCats"
                        src={twoCats}
                        alt=""
                        onClick={catsTalk}
                    />
                </>
                : null
            }
            <audio ref={pikaAudioRef} id="audio" src={cuteMeow}></audio>
            <audio ref={jaymeeAudioRef} id="audio" src={cuteMeowHigher}></audio>
        </div>
    )
}
