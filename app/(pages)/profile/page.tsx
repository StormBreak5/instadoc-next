"use client";
import { useEffect, useContext } from "react";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

import { AuthContext } from "@/app/contexts/AuthContext";
import { serverURL } from "@/app/services/http-service";
import { getAPIClient } from "@/app/services/axios";

export default function Profile() {
  const user = useContext(AuthContext);

  useEffect(() => {
    serverURL.get("/users");
  }, []);

  return;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx);
  const { ["instadoc-token"]: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: "/Login",
      permanent: false,
    };
  }

  await apiClient.get("/users");

  return {
    props: {},
  };
};
