"use client";

import { useEffect, useState } from "react";

interface FirstTimeOverviewProps {
    username: string;
}

export default function FirstTimeOverview(props: FirstTimeOverviewProps) {
  const [games, setGames] = useState<any[]>([]);
  const [overview, setOverview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function fetchGamesAndAnalyze() {
    setLoading(true);
    try {
      const res = await fetch(`https://lichess.org/api/games/user/${props.username}?max=5`, {
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

      setGames(parsedGames); 
      console.log(process.env.NEXT_PUBLIC_OPENAI_API_KEY);

      const gptRes = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`, // Secure API Key
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo", 
          messages: [
            { role: "system", content: "You are a chess analyst providing insights on games." },
            { role: "user", content: `Analyze the following chess games:\n${JSON.stringify(parsedGames, null, 2)}` },
          ],
          temperature: 0.7, 
          max_tokens: 1000, 
        }),
      });

      const gptData = await gptRes.json();
      console.log("gpt response", gptData);
      if (!gptData.choices || gptData.choices.length === 0) {
        throw new Error(`OpenAI API Error: ${gptData.error?.message || "No choices returned"}`);
      }
      setOverview(gptData.choices[0].message.content); 

    } catch (error) {
      console.error("Error fetching data:", error);
      setOverview("Failed to analyze games.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchGamesAndAnalyze();
  }, [props.username]);

  return (
    <div>
      <h2>Chess Overview for {props.username}</h2>
      {loading ? <p>Loading games and generating overview...</p> : <pre>{overview}</pre>}
    </div>
  );
}
