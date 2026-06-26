import { useContext } from "react";

import { AuthContext } from "@/contexts/AuthContext";

const useSignOut = () => {
  const { signOut } = useContext(AuthContext);

  const onSubmit = async () => {
    try {
      await signOut();
    } catch (error) {
      console.log(error);
    }
  };

  return { onSubmit };
};

export default useSignOut;
