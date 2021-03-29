import "./App.css";
import { useEffect, useRef, useState } from "react";
import DragSleepingPika from "./DragSleepingPika";
import Peek from "./Peek";
import TwoCatsJoke from "./TwoCatsJoke";

export default function App() {

    return (
        <div className="page">
            <DragSleepingPika />
            <Peek />
            <TwoCatsJoke />
        </div>
    );
}