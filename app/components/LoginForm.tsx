"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Input,
  Typography,
} from "@material-tailwind/react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AuthContext } from "../contexts/AuthContext";

const loginFormSchema = z.object({
  email: z.string().nonempty("Insira algum e-mail"),
  password: z.string().nonempty("Insira a senha"),
});

type loginFormData = z.infer<typeof loginFormSchema>;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginFormData>({
    resolver: zodResolver(loginFormSchema),
  });
  const { signIn } = useContext(AuthContext);

  async function handleSignIn(data: any) {
    console.log(data);
    await signIn(data);
  }

  return (
    <Card className="w-1/3">
      <CardHeader
        variant="gradient"
        color="blue"
        className="mb-4 grid h-28 place-items-center"
      >
        <Typography variant="h3" color="white">
          Login
        </Typography>
      </CardHeader>
      <form onSubmit={handleSubmit(handleSignIn)}>
        <CardBody className="flex flex-col gap-4">
          <div>
            <Input
              label="E-mail"
              size="lg"
              error={errors.email ? true : false}
              {...register("email")}
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </div>
          <div>
            <Input
              type="password"
              label="Senha"
              size="lg"
              error={errors.password ? true : false}
              {...register("password")}
            />
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </div>
          <div className="-ml-2.5">
            <Checkbox label="Lembrar" />
          </div>
        </CardBody>
        <CardFooter className="pt-0">
          <Button type="submit" variant="gradient" fullWidth>
            Entrar
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
            Não tem conta?
            <Typography
              as="a"
              href="/Register"
              variant="small"
              color="blue"
              className="ml-1 font-bold"
            >
              Cadastre-se
            </Typography>
          </Typography>
        </CardFooter>
      </form>
    </Card>
  );
}
