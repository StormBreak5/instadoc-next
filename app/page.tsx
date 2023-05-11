"use client";
import { useEffect, useState } from "react";
import {
  LoginButton,
  LogoutButton,
  ProfileButton,
  RegisterButton,
} from "./components/button.component";

export default async function Home() {
  const [message, setMessage] = useState("");
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    async () => {
      try {
        const response = await fetch("http://localhost:8000/api/user", {
          credentials: "include",
        });

        const content = await response.json();

        setMessage(`Hi, ${content.name}`);
        setAuth(true);
      } catch (error) {
        setMessage("You are not logged in");
        setAuth(false);
      }
    };
  }, []);

  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "70vh",
      }}
    >
      <div>
        <LoginButton />
        <RegisterButton />
        <LogoutButton />
        <ProfileButton />
        {message}
      </div>
    </main>
  );
}
