"use client";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import userService from "../services/users/user-service";
import { SyntheticEvent, useState } from "react";
import { headers } from "next/dist/client/components/headers";
import { useRouter } from "next/navigation";

const createUserFormSchema = z
  .object({
    name: z.string().nonempty("Nome é obrigatório"),
    email: z
      .string()
      .nonempty("E-mail é obrigatório")
      .email("Formato de e-mail inválido."),
    confirmEmail: z.string(),
    password: z.string().min(8, "A senha precisa de no mínimo 8 caracteres."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas devem ser iguais",
    path: ["confirmPassword"],
  })
  .refine((data) => data.email === data.confirmEmail, {
    message: "Os e-mails não são iguais",
    path: ["confirmEmail"],
  });

type CreateUserFormData = z.infer<typeof createUserFormSchema>;

export default function UserForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await fetch("http://localhost:8000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    console.log(name, email, password);

    await router.push("/");
  };

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<CreateUserFormData>({
  //   resolver: zodResolver(createUserFormSchema),
  // });

  // function registerUser(data: any) {
  //   userService.save(data);
  // }

  return (
    <Card className="w-1/3 ">
      <CardHeader
        variant="gradient"
        color="blue"
        className="mb-4 grid h-28 place-items-center"
      >
        <Typography variant="h3" color="white">
          Cadastre-se
        </Typography>
      </CardHeader>
      <form onSubmit={submit}>
        <CardBody className="flex flex-col gap-4">
          <div>
            <Input
              label="Nome"
              size="lg"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <Input
              label="E-mail"
              size="lg"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <Input
              label="Confirmar e-mail"
              size="lg"
              onChange={(e) => setConfirmEmail(e.target.value)}
            />
          </div>
          <div>
            <Input
              label="Senha"
              type="password"
              size="lg"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <Input
              label="Confirmar senha"
              type="password"
              size="lg"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </CardBody>
        <CardFooter className="pt-0">
          <Button type="submit" variant="gradient" fullWidth>
            Cadastrar
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
