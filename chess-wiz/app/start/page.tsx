"use client"; 

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter(); 
  const [username, setUsername] = useState("");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault(); 
    if (!username.trim()) return;
    router.push(`/overview?user=${username}`); 
  }

  return (
    <div>
        Please enter a Lichess Username.
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="username"
        placeholder="Lichess Username"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
    </div>
  );
}
