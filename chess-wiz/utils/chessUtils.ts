import { Chess } from "chess.js";

export function movesToFen(moves: string[]): string {
  const game = new Chess();

  moves.forEach((move) => {
    game.move(move); 
  });

  return game.fen();
}

export async function gameStrings(username:string) : Promise<string[]> {
    const res = await fetch(`https://lichess.org/api/games/user/${username}?max=5`, {
        headers: { Accept: "application/x-ndjson" },
      });

      if (!res.ok) {
        throw new Error(`Lichess API Error: ${res.status}`);
      }

      const data = await res.text();
      const parsedGames = data
        .trim()
        .split("\n")
        .map((line) => JSON.parse(line));

    const moveArray = parsedGames.map((games) => (games.moves));
    console.log(moveArray)
    return moveArray;
}

export async function getEval(fen: string): Promise<number> {
    try {
        const res = await fetch(`https://stockfish.online/api/s/v2.php/?fen=${fen}&depth=12`);
        if (!res.ok) {
            throw new Error(`Stockfish API Error: ${res.status}`);
        }

        const data = await res.json();

        if (typeof data.evaluation === "number") {
            return data.evaluation;
        } else if (typeof data.mate === "number") {
            return data.mate > 0 ? 100 : -100;
        } else {
            throw new Error("Evaluation data missing");
        }
    } catch (error) {
        console.error("Error fetching Stockfish evaluation:", error);
        return 0;
    }
}
