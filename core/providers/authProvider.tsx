'use client'
import API from "@/core/api";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { AUTH_CLIENT_URL, AUTH_SERVER_URL, CLIENT_URL, ROOT_DOMAIN, SERVER_URL } from "../constants";

const AuthContext = createContext<any>(null);

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const userApi = new API()

  const localUser = typeof window !== "undefined" && window.localStorage.getItem("user");
  const [user, setUser] = useState(localUser ? JSON.parse(localUser) : null);

  const login = (): void => {
    const oauthServerUrl = `${CLIENT_URL}/api/auth?login=true`;
    const width = 400, height = 420;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;
    window.open(oauthServerUrl, 'authPopup', `width=${width},height=${height},top=${top},left=${left}`);
  };

  const handleAuthMessage = async (event: MessageEvent) => {
    if (event.origin !== AUTH_CLIENT_URL) {
      console.warn("Message from unknown origin", event.origin);
      return;
    }

    const authCode = event.data.simpleIdToken;

    const user = await axios.get(`${AUTH_SERVER_URL}/userInfo`, {
        headers: { Authorization: `Bearer ${authCode}` },
      });

      const date = new Date().getTime().toString()

      const userFromDb = await userApi.users.createUser({
        access_token: authCode, wallet: {evm: user.data.wallets.evm, bitcoin: user.data.wallets.bitcoin, litecoin: user.data.wallets.litecoin, tron: user.data.wallets.tron}, email: user.data.email, title: user.data.sub})
      setUser(userFromDb)
  };

  useEffect(() => {
    window.addEventListener('message', handleAuthMessage);

    return () => {
      window.removeEventListener('message', handleAuthMessage);
    };
  }, []);

  const logout = () => {
    setUser(null);
    typeof window !== "undefined" && window.localStorage.removeItem("user");
  };

  const value = {
    user,
    login,
    logout,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
