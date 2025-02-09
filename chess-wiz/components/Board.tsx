"use client";

import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { useState, useEffect } from "react";
import { movesToFen, gameStrings, getEval } from "@/utils/chessUtils";
import Bar from "./Bar";
import style from "./Board.module.css";

export default function Board() {
    const [game, setGame] = useState(new Chess());
    const [moves, setMoves] = useState<string[]>([]);
    const [currentMoveIndex, setCurrentMoveIndex] = useState(-1);
    const [evaluation, setEval] = useState<number>(0);

    useEffect(() => {
        async function fetchGameMoves() {
            try {
                const fetchedMoves = await gameStrings("sonicisreal"); 
                if (fetchedMoves.length > 0) {
                    setMoves(fetchedMoves[0].split(" ")); 
                }
            } catch (error) {
                console.error("Error fetching game moves:", error);
            }
        }
        fetchGameMoves();
    }, []);

    useEffect(() => {
        async function fetchEval() {
            const newEval = await getEval(game.fen());
            setEval(newEval);
        }
        fetchEval();
    }, [game]);

    async function makeAMove(direction: number) {
        if (moves.length === 0) return;
        
        if (direction == 1 && currentMoveIndex < moves.length - 1) {
            const newMoveIndex = currentMoveIndex + direction;
            const gameCopy = new Chess(game.fen()); 
            gameCopy.move(moves[newMoveIndex]);
            setGame(gameCopy);
            setCurrentMoveIndex(newMoveIndex);
        } else if (direction == 0) {
            setGame(new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"));
            setCurrentMoveIndex(-1);
        } else if (direction == 2) {
            const fen = movesToFen(moves);
            setGame(new Chess(fen));
            setCurrentMoveIndex(moves.length - 1);
        } else if (direction == -1 && currentMoveIndex >= 0) {
            const moveSlice = moves.slice(0, currentMoveIndex);
            const fen = movesToFen(moveSlice);
            setGame(new Chess(fen));
            setCurrentMoveIndex(currentMoveIndex - 1);
        }
        console.log("eval", evaluation);
    }

    return (
        <div>
            <section id={style.boardStuff}>
                <section id={style.bar}>
                    <Bar eval={evaluation}/>
                </section>
                <section id={style.board}>
                    <Chessboard position={game.fen()} />
                </section>
            </section>
            
            <section id={style.boardButtons}>
                <button className={style.arrow} onClick={() => makeAMove(0)}>&lt;&lt;</button>
                <button className={style.arrow} onClick={() => makeAMove(-1)}>&lt;</button>
                <button className={style.arrow} onClick={() => makeAMove(1)}>&gt;</button>
                <button className={style.arrow} onClick={() => makeAMove(2)}>&gt;&gt;</button>
            </section>
        </div>
    );
}
