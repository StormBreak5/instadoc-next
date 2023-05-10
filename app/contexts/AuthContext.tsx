"use client";
import { SessionProvider as AuthContext } from "next-auth/react";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Providers = ({ children }: Props) => {
  return <AuthContext>{children}</AuthContext>;
};

export default Providers;
