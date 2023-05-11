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
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginFormSchema = z.object({
  email: z.string().nonempty("Insira algum e-mail"),
  password: z.string().nonempty("Insira a senha"),
});

type loginFormData = z.infer<typeof loginFormSchema>;

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    });

    await router.push("/");
  };

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<loginFormData>({
  //   resolver: zodResolver(loginFormSchema),
  // });

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
      <form onSubmit={submit}>
        <CardBody className="flex flex-col gap-4">
          <div>
            <Input
              label="E-mail"
              size="lg"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <Input
              type="password"
              label="Senha"
              size="lg"
              onChange={(e) => setPassword(e.target.value)}
            />
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
