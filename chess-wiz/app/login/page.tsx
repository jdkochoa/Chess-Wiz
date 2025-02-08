import { useState } from "react";
import style from "./signup.module.css";
import { login } from "./actions";
import { SubmitButton } from "@/components/submit-button";

export default function LoginPage() {
  return (
    <div className="">
      <div>
        <h1>Login</h1>
      </div>
      <br />
      <form className="" action="">
        <label htmlFor="email">Email</label>
        <br />
        <input id="email" name="email" type="email" required />
        <br />
        <label htmlFor="password">Password</label>
        <br />
        <input id="password" name="password" type="password" required />
        <br />
        <br />
        <button formAction={login}>Submit</button>
      </form>
    </div>
  );
}
