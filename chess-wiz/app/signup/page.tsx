import { useState } from "react";
import style from "/app/components/SignUp.module.css";
import { signup } from "./actions";

export default function SignUpPage() {
  return (
    <div className="container">
      <div>
        <h1>Sign Up</h1>
      </div>
      <br />
      <form action="">
        <label htmlFor="name">Name</label>
        <br />
        <input className="input" id="name" name="name" type="text" required />
        <br />
        <label htmlFor="lichess_account">Lichess Account</label>
        <br />
        <input
          id="lichess_account"
          name="lichess_account"
          type="text"
          required
        />
        <br />
        <label htmlFor="email">Email</label>
        <br />
        <input id="email" name="email" type="email" required />
        <br />
        <label htmlFor="password">Password</label>
        <br />
        <input id="password" name="password" type="password" required />
        <br />
        <br />
        <button formAction={signup}>Sign Up</button>
      </form>
    </div>
  );
}
