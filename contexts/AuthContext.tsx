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
  signOut(): Promise<void>;
  userData: userDataProps | null;
}

export const AuthContext = createContext({} as AuthContextData);

export default function AuthProvider({ children }: AutoProviderProps) {
  const [signed, setSigned] = useState(false);
  const [userData, setUserData] = useState<userDataProps | null>(null);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUserData({
          user_id: session.user.id,
          name: session.user.user_metadata?.name ?? "",
          email: session.user.email ?? "",
        });
        setSigned(true);
      } else {
        setUserData(null);
        setSigned(false);
      }

      requestAnimationFrame(() => {
        router.replace(session ? "/home" : "/login");
      });
    });

    return () => subscription.unsubscribe();
  }, []);

  async function signIn(email: string, password: string) {
    await supabase.auth
      .signInWithPassword({
        email: email,
        password: password,
      })
      .then(async (data) => {
        let userData = {
          user_id: data.data.user?.id as string,
          email: email,
          name: data.data.user?.user_metadata.name,
        };

        setUserData(userData);
      })
      .catch((error) => {
        console.log(error);
      });
  }

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

  async function signOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log(error);
      return;
    }

    router.replace("/login");
    setUserData(null);
  }

  return (
    <AuthContext value={{ signed, signIn, signUp, userData, signOut }}>
      {children}
    </AuthContext>
  );
}
