import { Chess } from "chess.js";

export function movesToFen(moves: string[]): string {
  const game = new Chess();

  moves.forEach((move) => {
    game.move(move); 
  });

  return game.fen();
}

export async function gameStrings(username:string) {
    const res = await fetch(`https://lichess.org/api/games/user/${username}?max=5`, {
        headers: { Accept: "application/x-ndjson" },
      });

      if (!res.ok) {
        throw new Error(`Lichess API Error: ${res.status}`);
      }

      const text = await res.text();
      const parsedGames = text
        .trim()
        .split("\n")
        .map((line) => JSON.parse(line));

    const moveArray = parsedGames.map((games) => (games.moves));
    console.log(moveArray)
    return moveArray;
}
