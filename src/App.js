import "./App.css";
import pika from "./assets/pika-cropped.png";
import meow from "./assets/meow1.mp3";
import annoyedMeow from "./assets/annoyed-meow.mp3";
import { useRef, useState } from "react";
import DragThis from "./DragThis";
import Peek from "./Peek";

function App() {
    const audioRef = useRef(null);
    const [isShowPika, setIsShowPika] = useState(true)

    function hidePika() {
        console.log("clicked pika");
        if (audioRef.current) {
            audioRef.current.play();
        }
        setIsShowPika(false)
    }

    return (
        <div>
            <DragThis />
            <Peek />
            {/* <div className="flex-container">
                <div className="flex-item"></div>
                <div className="flex-item"></div>
                <div className="flex-item">
                    <div className="box">
                        <img style={{display: isShowPika ? "block" : "none"}} onDoubleClick={hidePika} src={pika} alt="pika" />
                    </div>
                </div>
                <div className="flex-item"></div>
            </div>
            <audio ref={audioRef} id="audio" src={meow}></audio> */}
        </div>
    );
}

export default App;
