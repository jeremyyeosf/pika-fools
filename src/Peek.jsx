import React, { useEffect, useRef, useState } from 'react'
import peekingPika from "./assets/peeking-pika.png";
import './Peek.css'
import meow from "./assets/meow1.mp3";

export default function Peek() {
    const [speechCounter, setSpeechCounter] = useState(0)
    const [speech1, setSpeech1] = useState(false)
    const [speech2, setSpeech2] = useState(false)
    const [speech3, setSpeech3] = useState(false)
    const [isShowPika, setIsShowPika] = useState(true)
    const audioSpeech1 = useRef(null);

    useEffect(() => {
        if (speechCounter === 3) {
            byePika()
        }
    }, [speechCounter])

    function byePika() {
        setTimeout(() => {
            setSpeech3(false)
            setIsShowPika(false)
        }, 3000)
    }

    function saySpeech() {
        if (speechCounter === 0) {
            setSpeech1(true)
            setSpeechCounter(prevState => prevState + 1)
        } else if (speechCounter === 1) {
            setSpeech1(false)
            setSpeech2(true)
            setSpeechCounter(prevState => prevState + 1)
        } else if (speechCounter === 2) {
            setSpeech2(false)
            setSpeech3(true)
            setSpeechCounter(prevState => prevState + 1)
        }

        if (audioSpeech1.current) {
            audioSpeech1.current.load()
            audioSpeech1.current.play()
        }
    }

    return (
        <div className="page">
            <div id="thought-parent" style={{ display: speech1 ? "block" : "none" }}>
                <div className="thought">Hello human.</div>
            </div>
            <div id="thought-parent" style={{ display: speech2 ? "block" : "none" }}>
                <div className="thought">Today is April Fools' Day.</div>
            </div>
            <div id="thought-parent" style={{ display: speech3 ? "block" : "none" }}>
                <div className="thought">I will see you later.</div>
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

            <audio ref={audioSpeech1} id="audio" src={meow}></audio>
        </div>
    )
}







{/* <div class="box3 sb13">Hello human.</div> */ }
