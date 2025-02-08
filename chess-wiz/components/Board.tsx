"use client";

import { Chess } from "chess.js";
import {Chessboard} from "react-chessboard";
import { useState, useEffect } from "react";
import { movesToFen } from "@/utils/chessUtils";
import { gameStrings } from "@/utils/chessUtils";

export default function Board() {
    const [game, setGame] = useState(new Chess());


    return (
        <div style={{ width: "500px", height: "500px", margin: "auto" }}>
            <Chessboard />
        </div>
    )
}