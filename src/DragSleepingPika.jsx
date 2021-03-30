import React, { useEffect, useRef, useState } from 'react'
import './DragSleepingPika.css'
import useMousePosition from './useMousePosition'
// import pika from "./assets/pika-cropped.png";
// import pika2 from "./assets/pika2-cropped.png";
// import annoyedMeow from "./assets/annoyed-meow.mp3";
import softMeow1 from "./assets/soft-meow-1.wav";
import softMeow2 from "./assets/soft-meow-2.wav";
import snore from "./assets/catsnoring.mp3";
import sleepingPika from "./assets/sleeping-pika-cropped.png"
import blanketPika from "./assets/pika-blanket-cropped.png"

export default function DragSleepingPika() {
    const pikaRef = useRef(null)
    const exitRef = useRef(null)
    const { x, y } = useMousePosition();
    const [currX, setCurrX] = useState(0)
    const [currY, setCurrY] = useState(0)
    const [isMouseDown, setIsMouseDown] = useState(false)
    const audioHidePika = useRef(null);
    const audioMovePika = useRef(null);
    const snoreAudio = useRef(null);

    const [isShowPika, setIsShowPika] = useState(true)
    // [left, right, top, bottom]
    const [pikaRect, setPikaRect] = useState(null)
    const [exitRect, setExitRect] = useState(null)
    const [isOverlap, setIsOverlap] = useState(false)


    // useEffect(() => {
    //     console.log("currX: ", currX, "currY: ", currY)
    // }, [currX, currY])

    // useEffect(() => {
    //     console.log('exitRect', exitRect)
    // }, [exitRect])

    useEffect(() => {
        if (exitRef.current) {
            let rect = exitRef.current.getBoundingClientRect()
            // console.log('exit rect', rect)
            setExitRect([rect.left, rect.right, rect.top, rect.bottom])
        }
    }, [])

    useEffect(() => {
        if (pikaRef.current) {
            let rect = pikaRef.current.getBoundingClientRect()
            // console.log('pika rect', rect)
            setPikaRect([rect.left, rect.right, rect.top, rect.bottom])
        }
    }, [currX])

    useEffect(() => {
        // [left, right, top, bottom]
        // pikaRect - rect1
        // exitRect - rect2
        // var overlap = !(rect1.right < rect2.left || 
        //     rect1.left > rect2.right || 
        //     rect1.bottom < rect2.top || 
        //     rect1.top > rect2.bottom)
        // console.log('is overlapping?', pikaRect, exitRect)
        if (pikaRect == null || exitRect == null) {
            console.log('rect is null')
        } else {
            let overlap = !(pikaRect[1] < exitRect[0] ||
                pikaRect[0] > exitRect[1] ||
                pikaRect[3] < exitRect[2] ||
                pikaRect[2] > exitRect[3])
            if (overlap) {
                setIsOverlap(true)
                console.log('overlap', overlap)
            } else {
                setIsOverlap(false)
                console.log('overlap', overlap)
            }
        }
    }, [pikaRect, exitRect])

    useEffect(() => {
        if (isOverlap && !isMouseDown) {
            hidePika()
            if (snoreAudio.current) {
                snoreAudio.current.pause()
            }
        }
    }, [isOverlap, isMouseDown])

    useEffect(() => {
        if (snoreAudio.current) {
            snoreAudio.current.play()
        }
    }, [])

    useEffect(() => {
        if (isMouseDown) {
            let offsetX = currX - x
            let offsetY = currY - y
            setCurrX(x)
            setCurrY(y)
            pikaRef.current.style.left = pikaRef.current.offsetLeft - offsetX + "px"
            pikaRef.current.style.top = pikaRef.current.offsetTop - offsetY + "px"
        }
    }, [isMouseDown, x, y, currX, currY])

    function mouseDown(e) {
        e.preventDefault()
        console.log('mouse down')
        setIsMouseDown(true)
        setCurrX(x)
        setCurrY(y)
        if (audioMovePika.current) {
            audioMovePika.current.play();
        }
        if (snoreAudio.current) {
            snoreAudio.current.pause()
        }
    }

    function mouseUp(e) {
        e.preventDefault()
        console.log('mouse up')
        setIsMouseDown(false)
        if (audioMovePika.current) {
            audioMovePika.current.load();
        }
        if (snoreAudio.current) {
            snoreAudio.current.play()
        }
    }

    function hidePika() {
        if (audioHidePika.current) {
            audioHidePika.current.play();
        }
        setIsShowPika(false)
    }

    return (
        <>
            <div
                className="container-dragthis"
                ref={pikaRef}
                onMouseDown={(e) => mouseDown(e)}
                onMouseUp={(e) => mouseUp(e)}
                onDoubleClick={hidePika}
                style={{ display: isShowPika ? "block" : "none" }}
            >

                {isMouseDown
                    ? <img id="blanketPika" src={blanketPika} alt="" className="image-dragthis" />
                    :
                    <>
                        <div id="zzz-bubble-parent">
                            <div className="zzz-bubble">Zzz..</div>
                        </div>
                        <img id="sleepingPika" src={sleepingPika} alt="" className="image-dragthis" />
                    </>

                }
                <div id="pika-bed-parent">
                    <div className="pika-bed" style={{ display: isMouseDown ? "none" : "block" }}>Zzz   </div>
                </div>

            </div>
            <div id="exit" ref={exitRef}>
                <div>
                    Drag Pika here if you can't put up with her snoring
                </div>
            </div>
            <audio preload="auto" ref={audioHidePika} id="audio" src={softMeow2}></audio>
            <audio preload="auto" ref={audioMovePika} id="audio" src={softMeow1}></audio>
            <audio preload="auto" loop ref={snoreAudio} id="audio" src={snore}></audio>
        </>
    )
}
