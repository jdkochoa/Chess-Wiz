"use client";

import React from "react";

interface BarProps {
    eval: number;
}

export default function Bar(props: BarProps) {
    const proportion = props.eval < -7 ? 0 : props.eval > 7 ? 100 : 49 + 7 * props.eval;

    return (
        <div style={{ width: "20px", height: "500px", display: "flex", flexDirection: "column", border: "2px goldenrod solid" }}>
            <section style={{ backgroundColor: "darkgray", height: `${100 - proportion}%`, width: "100%" }} />
            <section style={{ backgroundColor: "white", height: `${proportion}%`, width: "100%" }} />
        </div>
    );
}
