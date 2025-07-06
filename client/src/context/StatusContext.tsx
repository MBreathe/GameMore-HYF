import { createContext, type JSX, useState } from "react";

export type StatusContextType = {
  token: string | null;
  setToken: (token: string | null) => void;
};

export const StatusContext = createContext<StatusContextType | null>(null);

export default function StatusContextProvider({
  children,
}: {
  children: JSX.Element;
}) {
  const [token, setToken] = useState<string | null>(null);

  return (
    <StatusContext.Provider
      value={{  token, setToken }}
    >
      {children}
    </StatusContext.Provider>
  );
}
