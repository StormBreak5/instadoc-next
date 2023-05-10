"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { axiosAuth } from "../axios";
import { useRefreshToken } from "./useRefreshToken";

const useAxiosAuth = () => {
  const { data: session } = useSession();
  const refreshToken = useRefreshToken();

  useEffect(() => {
    const reqIntercept = axiosAuth.interceptors.request.use((config) => {
      if (!config.headers["Authorization"]) {
        config.headers["Authorization"] = `Bearer ${session?.user.accessToken}`;
      }

      return config;
    });

    const resIntercept = axiosAuth.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error.config;
        if (error.response.status === 401 && !prevRequest.sent) {
          prevRequest.sent = true;
        }
      }
    );

    return () => {
      axiosAuth.interceptors.request.eject(reqIntercept);
    };
  }, [session]);

  return axiosAuth;
};

export default useAxiosAuth;
