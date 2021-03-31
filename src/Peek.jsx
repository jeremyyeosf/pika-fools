import React, { useEffect, useRef, useState } from 'react'
import peekingPika from "./assets/peeking-pika.png";
import './Peek.css'
import cuteMeow from "./assets/cute-meow.wav";

export default function Peek({ setEndOfCurrJoke }) {
    const [speechCounter, setSpeechCounter] = useState(0)
    const [isShowPika, setIsShowPika] = useState(true)
    const audioSpeech1 = useRef(null);

    useEffect(() => {
        function byePika() {
            setTimeout(() => {
                setIsShowPika(false)
                setSpeechCounter(prevState => prevState + 1)
                if (audioSpeech1.current) {
                    audioSpeech1.current.load()
                    audioSpeech1.current.play()
                }
                setEndOfCurrJoke(true)
            }, 3000)
        }
        if (speechCounter === 3) {
            byePika()
        }
    }, [speechCounter, setEndOfCurrJoke])

    function saySpeech() {
        if (speechCounter !== 3) {
            setSpeechCounter(prevState => prevState + 1)
        }
        if (speechCounter === 0 && audioSpeech1.current) {
            audioSpeech1.current.load()
            audioSpeech1.current.play()
        }
    }

    return (
        <div>
            <div id="thought-parent" style={{ display: speechCounter === 1 ? "block" : "none" }}>
                <div className="thought">Hello human.</div>
            </div>
            <div id="thought-parent" style={{ display: speechCounter === 2 ? "block" : "none" }}>
                <div className="thought">I'm here to brighten up your day.</div>
            </div>
            <div id="thought-parent" style={{ display: speechCounter === 3 ? "block" : "none" }}>
                <div className="thought">See you later~</div>
            </div>
            {isShowPika
                ? <div
                    className="peeking-pika-container"
                    onClick={saySpeech}
                >
                    <img className="peeking-pika-image" src={peekingPika} alt="" />
                </div>
                : <></>
            }
            <audio ref={audioSpeech1} id="audio" src={cuteMeow}></audio>
        </div>
    )
}