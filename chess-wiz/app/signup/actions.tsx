"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signup = async (formData: FormData) => {
  const name = formData.get("name")?.toString();
  const lichess_account = formData.get("lichess_account")?.toString();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  if (!email || !password) {
    return encodedRedirect(
      "error",
      "/sign-up",
      "Email and password are required"
    );
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  const { error: insertError } = await supabase
    .from("users")
    .insert([{ user_name: name, lichess_account: lichess_account }]);

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/sign-up", error.message);
  } else if (insertError) {
    console.error(insertError.code + " " + insertError.message);
    return encodedRedirect("error", "/sign-up", insertError.message);
  } else {
    return encodedRedirect("success", "/login", "Thanks for signing up!");
  }
};
