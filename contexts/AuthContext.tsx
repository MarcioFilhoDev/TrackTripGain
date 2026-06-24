import { supabase } from "@/config/supabase";
import { router } from "expo-router";
import { createContext, useEffect, useState } from "react";

interface AutoProviderProps {
  children: React.ReactNode;
}

type userDataProps = {
  user_id: string;
  name: string;
  email: string;
};

interface AuthContextData {
  signed: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  userData: userDataProps | null;
}

export const AuthContext = createContext({} as AuthContextData);

export default function AuthProvider({ children }: AutoProviderProps) {
  const [signed, setSigned] = useState(false);
  const [userData, setUser] = useState<userDataProps | null>(null);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUser({
          user_id: session.user.id,
          name: session.user.user_metadata?.name ?? "",
          email: session.user.email ?? "",
        });
        setSigned(true);
      } else {
        setUser(null);
        setSigned(false);
      }

      requestAnimationFrame(() => {
        router.replace(session ? "/home" : "/login");
      });
    });

    return () => subscription.unsubscribe();
  }, []);

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
      alert("ops, algo deu errado.");
      console.log(error);
      return;
    }
  }

  return (
    <AuthContext value={{ signed, signIn, signUp, userData }}>
      {children}
    </AuthContext>
  );
}
