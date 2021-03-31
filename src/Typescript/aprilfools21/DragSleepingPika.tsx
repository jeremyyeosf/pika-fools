import React, { useEffect, useRef, useState } from 'react'
import './DragSleepingPika.css'
import useMousePosition from './useMousePosition'

const softMeow1 = require("./assets/soft-meow-1.wav");
const softMeow2 = require("./assets/soft-meow-2.wav");
const snore = require("./assets/catsnoring.mp3");
const sleepingPika = require("./assets/sleeping-pika-cropped.png");
const blanketPika = require("./assets/pika-blanket-cropped.png");

export default function DragSleepingPika({ setEndOfCurrJoke }: {
    setEndOfCurrJoke: React.Dispatch<React.SetStateAction<boolean>>
}) {
    const pikaRef = useRef<HTMLDivElement>(null)
    const exitRef = useRef<HTMLDivElement>(null)
    const audioHidePika = useRef<HTMLAudioElement>(null);
    const audioMovePika = useRef<HTMLAudioElement>(null);
    const snoreAudio = useRef<HTMLAudioElement>(null);
    const [isShowPika, setIsShowPika] = useState(true)

    const { x, y } = useMousePosition();
    const [currX, setCurrX] = useState(0)
    const [currY, setCurrY] = useState(0)
    const [isMouseDown, setIsMouseDown] = useState(false)
    // [left, right, top, bottom]
    const [pikaRect, setPikaRect] = useState<number[] | null>(null)
    const [exitRect, setExitRect] = useState<number[] | null>(null)
    const [isOverlap, setIsOverlap] = useState(false)

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
        if (pikaRect == null || exitRect == null) {
            console.log('rect is null')
        } else {
            let overlap = !(pikaRect[1] < exitRect[0] ||
                pikaRect[0] > exitRect[1] ||
                pikaRect[3] < exitRect[2] ||
                pikaRect[2] > exitRect[3])
            if (overlap) {
                setIsOverlap(true)
                // console.log('overlap', overlap)
            } else {
                setIsOverlap(false)
                // console.log('overlap', overlap)
            }
        }
    }, [pikaRect, exitRect])

    useEffect(() => {
        if (isOverlap && !isMouseDown) {
            hidePika()
            if (snoreAudio.current) {
                snoreAudio.current.pause()
            }
            setEndOfCurrJoke(true)
        }
    }, [isOverlap, isMouseDown, setEndOfCurrJoke])

    useEffect(() => {
        if (snoreAudio.current) {
            snoreAudio.current.play()
        }
    }, [])

    useEffect(() => {
        if (isMouseDown && x !== null && y !== null) {
            let offsetX = currX - x
            let offsetY = currY - y
            setCurrX(x)
            setCurrY(y)
            if (pikaRef.current) {
                pikaRef.current.style.left = pikaRef.current.offsetLeft - offsetX + "px"
                pikaRef.current.style.top = pikaRef.current.offsetTop - offsetY + "px"
            }
        }
    }, [isMouseDown, x, y, currX, currY])

    function mouseDown(e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) {
        e.preventDefault()
        // console.log('mouse down')
        setIsMouseDown(true)
        if (x !== null && y !== null) {
            setCurrX(x)
            setCurrY(y)
        }
        if (audioMovePika.current) {
            audioMovePika.current.play();
        }
        if (snoreAudio.current) {
            snoreAudio.current.pause()
        }
    }

    function mouseUp(e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) {
        e.preventDefault()
        // console.log('mouse up')
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
            {isShowPika
                ?
                <>
                    <div
                        className="container-dragthis"
                        ref={pikaRef}
                        onMouseDown={(e) => mouseDown(e)}
                        onMouseUp={(e) => mouseUp(e)}
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
                        <div>Drag Pika here if you can't put up with her snoring</div>
                    </div>
                    <audio preload="auto" ref={audioHidePika} id="audio" src={softMeow2}></audio>
                    <audio preload="auto" ref={audioMovePika} id="audio" src={softMeow1}></audio>
                    <audio preload="auto" loop ref={snoreAudio} id="audio" src={snore}></audio>
                </>
                : null

            }

        </>
    )
}
