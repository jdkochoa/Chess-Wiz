"use client";
import React from "react";
import Board from "@/components/Board";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
export default function Home() {
    const user : string = useSearchParams().get("user") ?? "";
    return (

        <div>
            <Board username={user}/>
            
        </div>
    );
}