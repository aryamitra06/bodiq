import { createContext } from "react";

type AuthContextType = {
  user: any | null;
  loading: boolean;
  error: string | null;
  logout: () => Promise<void>;
  googleSignIn: () => Promise<void>;
  jwt: string | null;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
