"use client";

import { signIn, signOut } from "next-auth/react";
import Link from "next/link";

export const LoginButton = () => {
  return (
    <Link href="/Login" style={{ marginRight: 10 }}>
      Sign In
    </Link>
  );
};

export const RegisterButton = () => {
  return (
    <Link href="/Register" style={{ marginRight: 10 }}>
      Register
    </Link>
  );
};

export const LogoutButton = () => {
  return (
    <button style={{ marginRight: 10 }} onClick={() => signOut()}>
      Sign Out
    </button>
  );
};

export const ProfileButton = () => {
  return <Link href="/profile">Profile</Link>;
};
