import React, { useEffect, useRef, useState } from 'react'
import './DragThis.css'
import useMousePosition from './useMousePosition'
import pika from "./assets/pika-cropped.png";
import pika2 from "./assets/pika2-cropped.png";
import meow from "./assets/meow1.mp3";
import annoyedMeow from "./assets/annoyed-meow.mp3";




export default function DragThis() {
    const pikaRef = useRef(null)
    const { x, y } = useMousePosition();
    const [currX, setCurrX] = useState(0)
    const [currY, setCurrY] = useState(0)
    const [isMouseDown, setIsMouseDown] = useState(false)
    const audioHidePika = useRef(null);
    const audioMovePika = useRef(null);
    const [isShowPika, setIsShowPika] = useState(true)

    useEffect(() => {
        console.log("currX: ", currX, "currY: ", currY)
    }, [currX])

    useEffect(() => {
        if (isMouseDown) {
            let offsetX = currX - x
            let offsetY = currY - y
            setCurrX(x)
            setCurrY(y)
            pikaRef.current.style.left = pikaRef.current.offsetLeft - offsetX + "px"
            pikaRef.current.style.top = pikaRef.current.offsetTop - offsetY + "px"
        }
    }, [isMouseDown, x, y])

    function mouseDown(e) {
        e.preventDefault()
        console.log('mouse down')
        setIsMouseDown(true)
        setCurrX(x)
        setCurrY(y)
        if (audioMovePika.current) {
            audioMovePika.current.play();
        }
    }

    function mouseUp(e) {
        e.preventDefault()
        console.log('mouse up')
        setIsMouseDown(false)
        if (audioMovePika.current) {
            audioMovePika.current.load();
        }
    }

    function hidePika() {
        console.log("clicked pika");
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
                <img
                    className="image-dragthis"
                    src={isMouseDown ? pika2 : pika}
                    alt="pika"
                />
            </div>
            <audio ref={audioHidePika} id="audio" src={meow}></audio>
            <audio ref={audioMovePika} id="audio" src={annoyedMeow}></audio>
        </>
    )
}
