import { supabase } from "@/config/supabase";
import { createContext, useState } from "react";

interface AutoProviderProps {
  children: React.ReactNode;
}

interface AuthContextData {
  signed: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextData);

export default function AuthProvider({ children }: AutoProviderProps) {
  const [signed, setSigned] = useState(false);
  const [loading, setLoading] = useState(false);

  async function signIn(email: string, password: string) {}

  async function signUp(name: string, email: string, password: string) {
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          name: name,
        },
      },
    });

    if (error) {
      alert("erro");
      return;
    }
  }

  return (
    <AuthContext value={{ signed, loading, signIn, signUp }}>
      {children}
    </AuthContext>
  );
}
