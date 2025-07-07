import { createContext, type JSX, useState } from "react";

export type StatusContextType = {
  token: string | null;
  setToken: (token: string | null) => void;
  error: string | null;
  setError: (error: string | null) => void;
};

export const StatusContext = createContext<StatusContextType | null>(null);

export default function StatusContextProvider({
  children,
}: {
  children: JSX.Element;
}) {
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  return (
    <StatusContext.Provider value={{ token, setToken, error, setError }}>
      {children}
    </StatusContext.Provider>
  );
}
