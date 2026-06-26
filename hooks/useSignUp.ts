import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { z } from "zod";

import { AuthContext } from "@/contexts/AuthContext";

const signUpSchema = z.object({
  name: z.string().min(2, "Nome muito pequeno.").max(50, "Nome muito grande."),
  email: z
    .string()
    .email({ pattern: z.regexes.html5Email, error: "Esse e-mail é inválido." })
    .min(1, "O e-mail é obrigatório."),
  password: z.string().min(6, "A senha deve ter mais 5 caracteres."),
});

export type SignUpFormData = z.infer<typeof signUpSchema>;

const useSignUp = () => {
  const { signUp } = useContext(AuthContext);

  //  1 - declare useForm and define your resolver
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  //  3 - create function of current hook
  const onSubmit = async (data: SignUpFormData) => {
    try {
      //  calling function of authContext
      await signUp(data.name, data.email, data.password);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    control,
    handleSubmit,
    onSubmit,
    isSubmitting,
    errors,
  };
};

export default useSignUp;
