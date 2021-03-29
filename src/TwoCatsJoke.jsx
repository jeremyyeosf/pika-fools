import React, { useState } from 'react'
import twoCats from "./assets/two-cats-cropped.png"
import './TwoCatsJoke.css'


export default function TwoCatsJoke() {
    const [speechCounter, setSpeechCounter] = useState(0)

    function catsTalk() {
        if (speechCounter !== 9) {
            setSpeechCounter(prevState => prevState + 1)
        }
    }

    function clickYes() {
        setSpeechCounter(prevState => prevState + 1)

    }

    function clickNo() {
        setSpeechCounter(prevState => prevState + 2)
    }

    return (
        <div className="container">
            <div id="speech">
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
                    <div className="thought-pika">Because they're very <i>&nbsp;mewsical</i>!</div>
                </div>
                <div id="thought-parent-jaymee" style={{ display: speechCounter === 6 ? "block" : "none" }}>
                    <div className="thought-jaymee">Omg lame Pika..</div>
                </div>
                <div id="thought-parent-pika" style={{ display: speechCounter === 7 ? "block" : "none" }}>
                    <div className="thought-pika">Hmph! Well at least I know Human appreciates the joke.</div>
                </div>
                <div id="thought-parent-pika" style={{ display: speechCounter === 8 ? "block" : "none" }}>
                    <div className="thought-pika">Right Human?</div>
                </div>
                <div id="thought-parent-pika" style={{ display: speechCounter === 9 ? "block" : "none" }}>
                    <div className="thought-pika">
                        <button onClick={clickYes}>Yes</button>
                        <button onClick={clickNo}>Nope</button>
                    </div>
                </div>
                <div id="thought-parent-pika" style={{ display: speechCounter === 10 ? "block" : "none" }}>
                    <div className="thought-pika">See, Human agrees with me.</div>
                </div>
                <div id="thought-parent-jaymee" style={{ display: speechCounter === 11 ? "block" : "none" }}>
                    <div className="thought-jaymee">See, Human agrees with me.</div>
                </div>
                <div id="thought-parent-pika" style={{ display: speechCounter === 12 ? "block" : "none" }}>
                    <div className="thought-pika">*yawn* I'm getting tired...</div>
                </div>
                <div id="thought-parent-jaymee" style={{ display: speechCounter === 13 ? "block" : "none" }}>
                    <div className="thought-jaymee">*yawn* Me too...</div>
                </div>
                <div id="thought-parent-pika" style={{ display: speechCounter === 14 ? "block" : "none" }}>
                    <div className="thought-pika">Let's go take a nap.</div>
                </div>
                <div id="thought-parent-jaymee" style={{ display: speechCounter === 15 ? "block" : "none" }}>
                    <div className="thought-jaymee">Good idea.</div>
                </div>
            </div>
            <img
                id="twoCats"
                src={twoCats}
                alt=""
                onClick={catsTalk}
            />
        </div>
    )
}
