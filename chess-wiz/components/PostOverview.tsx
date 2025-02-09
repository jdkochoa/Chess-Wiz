"use server";

import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";

export async function CheckOverview(props: { username: string }) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("user_overview")
    .select("overview")
    .eq("lichess_account", props.username);

  if (error) {
    console.error(error.code + " " + error.message);
  } else {
    console.log("Overview retrieved successfully");
    return data;
  }
}

export async function PostOverview(props: {
  username: string;
  overview: string;
}) {
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  const { error: insertError } = await supabase
    .from("user_overview")
    .insert([{ lichess_account: props.username, overview: props.overview }]);

  if (insertError) {
    console.error(insertError.code + " " + insertError.message);
  } else {
    console.log("Overview saved successfully");
  }
  return;
}
