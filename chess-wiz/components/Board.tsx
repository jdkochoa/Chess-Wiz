"use client";

import {Chessboard} from "react-chessboard";

export default function Board() {
    return (
        <div style={{ width: "500px", height: "500px", margin: "auto" }}>
            <Chessboard />
        </div>
    )
}