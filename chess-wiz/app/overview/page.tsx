"use client"

import React from "react";
import Overview from "@/components/Overview";
import { useSearchParams } from "next/navigation";

export default function Home() {
    const user = useSearchParams().get("user") ?? "";
  return <Overview username={user} />;
}
