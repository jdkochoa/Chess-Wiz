import { Chess } from "chess.js";
import { useState, useEffect } from "react";

export function movesToFen(moves: string[]): string {
  const game = new Chess();

  moves.forEach((move) => {
    game.move(move);
  });

  return game.fen();
}

export async function gameStrings(username: string): Promise<string[]> {
  const res = await fetch(
    `https://lichess.org/api/games/user/${username}?max=5`,
    {
      headers: { Accept: "application/x-ndjson" },
    }
  );

  if (!res.ok) {
    throw new Error(`Lichess API Error: ${res.status}`);
  }

  const data = await res.text();
  const parsedGames = data
    .trim()
    .split("\n")
    .map((line) => JSON.parse(line));

  // This is the gameID
  const mostRecentGame = parsedGames[0].GameId;
  /* Check most recent game from lichess against most recent game in database from that user.
   * If it matches return null.
   */
  const moveArray = parsedGames.map((games) => games.moves);
  console.log(moveArray);
  return moveArray;
}

export async function getGameJson(username: string) {
  const res = await fetch(
    `https://lichess.org/api/games/user/${username}?max=5`,
    {
      headers: { Accept: "application/x-ndjson" },
    }
  );

  if (!res.ok) {
    throw new Error(`Lichess API Error: ${res.status}`);
  }

  const data = await res.text();
  const parsedGames = data
    .trim()
    .split("\n")
    .map((line) => JSON.parse(line));

  return parsedGames;
}

export async function getEval(fen: string): Promise<number> {
  try {
    const res = await fetch(
      `https://stockfish.online/api/s/v2.php/?fen=${fen}&depth=15`
    );
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

export async function getOverview(moves: string): Promise<string> {
  const gptRes = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`, // Secure API Key
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a chess analyst summarizing what happened in this game, where each player went wrong, and how each player could improve",
        },
        {
          role: "user",
          content: `Analyze the following chess game:\n${moves}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    }),
  });

  const gptData = await gptRes.json();
  console.log("gptData", gptData);
  console.log("gpt response", gptData);
  if (!gptData.choices || gptData.choices.length === 0) {
    throw new Error(
      `OpenAI API Error: ${gptData.error?.message || "No choices returned"}`
    );
  }
  return gptData.choices[0].message.content;
}
