import { AuthContext } from "@/contexts/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const signInSchema = z.object({
  email: z
    .string()
    .email({ pattern: z.regexes.html5Email, error: "Esse e-mail é inválido." })
    .min(1, "O e-mail é obrigatório."),
  password: z.string().min(6, "A senha deve ter mais 5 caracteres."),
});

export type SignInFormData = z.infer<typeof signInSchema>;

const useSignIn = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { signIn } = useContext(AuthContext);

  const onSubmit = async (data: SignInFormData) => {
    try {
      await signIn(data.email, data.password);
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

export default useSignIn;
