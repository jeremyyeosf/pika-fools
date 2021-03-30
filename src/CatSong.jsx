import React, { useEffect, useRef, useState } from 'react'
import pika from "./assets/pikasolo-cropped.png"
import './CatSong.css'
import cuteMeow from "./assets/cute-meow.wav";
import cuteMeowHigher from "./assets/cute-meow-higherpitched.wav";
import cuteMeowLower from "./assets/cute-meow-lowerpitched.wav";

export default function CatSong() {
    const [speechCounter, setSpeechCounter] = useState(0)
    const [isShowPika, setIsShowPika] = useState(true)
    const [clickedNo, setClickedNo] = useState(false)
    const pikaAudioRef = useRef(null);
    const pikaAudioHappyRef = useRef(null);
    const pikaAudioSadRef = useRef(null);

    useEffect(() => {
        if (speechCounter === 13) {
            byePika()
        }
    }, [speechCounter])

    function byePika() {
        setTimeout(() => {
            setIsShowPika(false)
        }, 3000)
    }

    function catsTalk() {
        // console.log('speech counter', speechCounter)
        switch (speechCounter) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 6:
            case 7:
            case 9:
            case 10:
            case 12:
                setSpeechCounter(prevState => prevState + 1)
                if (pikaAudioRef.current) {
                    pikaAudioRef.current.load()
                    pikaAudioRef.current.play()
                }
                break;
            default:
                break;
        }
    }

    function clickYes() {
        setSpeechCounter(prevState => prevState + 1)
        if (pikaAudioHappyRef.current) {
            pikaAudioHappyRef.current.load()
            pikaAudioHappyRef.current.play()
        }
    }

    function clickNo() {
        setSpeechCounter(prevState => prevState + 4)
        setClickedNo(true)
        if (pikaAudioSadRef.current) {
            pikaAudioSadRef.current.load()
            pikaAudioSadRef.current.play()
        }
    }

    function click1stSong() {
        setTimeout(() => {
            setSpeechCounter(prevState => prevState + 1)
        }, 2000);
    }

    function click2ndSong() {
        setTimeout(() => {
            clickedNo ? setSpeechCounter(prevState => prevState + 1) : setSpeechCounter(prevState => prevState + 4)
        }, 2000);
    }

    return (
        <div>
            {isShowPika
                ?
                <>
                    {/* <div>Speech Counter: {speechCounter}</div> */}
                    <div>
                        <div id="thought-parent-catsong" style={{ display: speechCounter === 1 ? "block" : "none" }}>
                            <div className="thought-catsong">Hi again Human.</div>
                        </div>
                        <div id="thought-parent-catsong" style={{ display: speechCounter === 2 ? "block" : "none" }}>
                            <div className="thought-catsong">I've been practicing my singing with Jaymee.</div>
                        </div>
                        <div id="thought-parent-catsong" style={{ display: speechCounter === 3 ? "block" : "none" }}>
                            <div className="thought-catsong">Have a listen.</div>
                        </div>
                        <div id="thought-parent-catsong" style={{ display: speechCounter === 4 ? "block" : "none" }}>
                            <div className="thought-catsong">
                                <a onClick={click1stSong} href="https://youtu.be/FJDtCw0MTNU?t=265" target="_blank" rel="noreferrer">Listen to Pika's and Jaymee's song</a></div>
                        </div>
                        <div id="thought-parent-catsong" style={{ display: speechCounter === 5 ? "block" : "none" }}>
                            <div className="thought-catsong">How was it?<br />
                                <button onClick={clickYes}>Great!</button>
                                <button onClick={clickNo}>Ouch my ears.</button>
                            </div>
                        </div>

                        <div id="thought-parent-catsong" style={{ display: speechCounter === 6 ? "block" : "none" }}>
                            <div className="thought-catsong">Aww...thank you Human.</div>
                        </div>
                        <div id="thought-parent-catsong" style={{ display: speechCounter === 7 ? "block" : "none" }}>
                            <div className="thought-catsong">I'm so happy I wanna dance.</div>
                        </div>
                        <div id="thought-parent-catsong" style={{ display: speechCounter === 8 ? "block" : "none" }}>
                            <div className="thought-catsong">
                                <a onClick={click2ndSong} id="learntomeow" href="https://www.youtube.com/watch?v=T_TIvdbxjy0" target="_blank" rel="noreferrer">Dance with Pika</a></div>
                        </div>


                        <div id="thought-parent-catsong" style={{ display: speechCounter === 9 ? "block" : "none" }}>
                            <div className="thought-catsong">My confidence has been shattered.</div>
                        </div>
                        <div id="thought-parent-catsong" style={{ display: speechCounter === 10 ? "block" : "none" }}>
                            <div className="thought-catsong">There is another song that we've been practicing.</div>
                        </div>
                        <div id="thought-parent-catsong" style={{ display: speechCounter === 11 ? "block" : "none" }}>
                            <div className="thought-catsong">
                                <a onClick={click2ndSong} id="troll" href="https://www.youtube.com/watch?v=5wOXc03RwVA" target="_blank" rel="noreferrer">Listen to the other song</a></div>
                        </div>

                        <div id="thought-parent-catsong" style={{ display: speechCounter === 12 ? "block" : "none" }}>
                            <div className="thought-catsong">Happy April Fools' Day Human!</div>
                        </div>
                        <div id="thought-parent-catsong" style={{ display: speechCounter === 13 ? "block" : "none" }}>
                            <div className="thought-catsong">Have a good day!</div>
                        </div>
                    </div>
                    <img
                        id="pika"
                        src={pika}
                        alt=""
                        onClick={catsTalk}
                    />
                </>
                : null
            }
            <audio ref={pikaAudioRef} id="audio" src={cuteMeow}></audio>
            <audio ref={pikaAudioHappyRef} id="audio" src={cuteMeowHigher}></audio>
            <audio ref={pikaAudioSadRef} id="audio" src={cuteMeowLower}></audio>
        </div>
    )
}
