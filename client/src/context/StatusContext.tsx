import { createContext, type JSX, useState } from "react";

export type StatusContextType = {
  loading: boolean;
  error: string | null;
  token: string | null;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setToken: (token: string | null) => void;
};

export const StatusContext = createContext<StatusContextType | null>(null);

export default function StatusContextProvider({
  children,
}: {
  children: JSX.Element;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  return (
    <StatusContext.Provider
      value={{ loading, error, token, setLoading, setError, setToken }}
    >
      {children}
    </StatusContext.Provider>
  );
}
