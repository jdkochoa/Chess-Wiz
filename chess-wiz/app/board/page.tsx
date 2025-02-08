import React from "react";
import Board from "@/components/Board";
import Link from "next/link";
export default function Home() {
    return (
        <div>
            <Board />
            <Link href="../overview">Overview</Link>
        </div>
    );
}