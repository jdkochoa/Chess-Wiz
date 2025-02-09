"use client";

import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { useState, useEffect } from "react";
import { movesToFen, gameStrings, getEval, getOverview } from "@/utils/chessUtils";
import Bar from "./Bar";
import style from "./Board.module.css";

interface BoardProps {
    username : string;
}

export default function Board(props: BoardProps) {
    const [game, setGame] = useState(new Chess());
    const [moves, setMoves] = useState<string[]>([]);
    const [currentGameIndex, setCurrentGameIndex] = useState(0);
    const [currentMoveIndex, setCurrentMoveIndex] = useState(-1);
    const [evaluation, setEval] = useState<number>(0);
    const [overview, setOverview] = useState<string | null>(null);

    useEffect(() => {
        async function fetchOverview() {
            try {
                const data = await gameStrings(props.username);
                /* If gameString is null return overview at currentGameIndex in supabase
                *   setOver(game[currentGameIndex])
                */
                const moveString = data[currentGameIndex];
                console.log("moveString", moveString)

                const fetchedOverview = await getOverview(moveString);
                console.log("overview", fetchedOverview);
                if (fetchOverview != null) {
                    setOverview(fetchedOverview);
                }
            } catch (error) {
                console.log("Error fetching game moves:", error);
            }
        }
        fetchOverview();
    }, [])

    useEffect(() => {
        async function fetchGameMoves() {
            try {
                const fetchedMoves = await gameStrings(props.username);
                // if fethed moves is null  setMoves(most recent game.split(" "))
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
            const newMoveIndex = currentMoveIndex + 1;
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

    async function changeGame(direction: number) {
        const fetchedMoves = await gameStrings(props.username);
        // if null make fethched moves last 5 games in db
        

        console.log("game strings in changeGame", fetchedMoves);
        if (direction == -1 && currentGameIndex > 0) {
            const newGameIndex = currentGameIndex - 1;
            setGame(new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"));
            setCurrentMoveIndex(-1);
            setEval(0);
            setMoves(fetchedMoves[newGameIndex].split(" "));
            setCurrentGameIndex(newGameIndex);
            // if most recent game was in db change to game[newGameIndex].overview from db
            const fetchedOverview = await getOverview(fetchedMoves[newGameIndex]);
            setOverview(fetchedOverview);
        } else if (direction == 1 && currentGameIndex < fetchedMoves.length) {
            const newGameIndex = currentGameIndex + 1;
            setGame(new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"));
            setCurrentMoveIndex(-1);
            setEval(0);
            setMoves(fetchedMoves[newGameIndex].split(" "));
            setCurrentGameIndex(newGameIndex);
            setOverview(fetchedMoves[newGameIndex]);
            // if most recent game was in db change to game[newGameIndex].overview from db
            const fetchedOverview = await getOverview(fetchedMoves[newGameIndex]);
            setOverview(fetchedOverview);

        }
    }

    return (
        <div id={style.pageContainer}>
    <div id={style.boardContainer}>
        <section id={style.matchButtons}>
            <button className={style.prevOrNext} onClick={() => changeGame(-1)}>Previous Match</button>
            <button className={style.prevOrNext} onClick={() => changeGame(1)}>Next Match</button>
        </section>
        <section id={style.boardStuff}>
            <section id={style.bar}>
                <Bar eval={evaluation} />
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

    <div id={style.summaryContainer}>
        <p id={style.summary}>{overview}</p>
    </div>
</div>

    );
}
