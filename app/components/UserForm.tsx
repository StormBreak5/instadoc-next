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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema),
  });

  function registerUser(data: any) {
    userService.save(data);
  }

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
      <form onSubmit={handleSubmit(registerUser)}>
        <CardBody className="flex flex-col gap-4">
          <div>
            <Input
              label="Nome"
              size="lg"
              error={errors.name ? true : false}
              {...register("name")}
            />
            {errors.name && (
              <span className="text-red-500">{errors.name.message}</span>
            )}
          </div>
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
              label="Confirmar e-mail"
              size="lg"
              error={errors.confirmEmail ? true : false}
              {...register("confirmEmail")}
            />
            {errors.confirmEmail && (
              <span className="text-red-500">
                {errors.confirmEmail.message}
              </span>
            )}
          </div>
          <div>
            <Input
              label="Senha"
              type="password"
              size="lg"
              error={errors.password ? true : false}
              {...register("password")}
            />
            {errors.password && (
              <span className="text-red-500 m-0">
                {errors.password.message}
              </span>
            )}
          </div>
          <div>
            <Input
              label="Confirmar senha"
              type="password"
              size="lg"
              error={errors.confirmPassword ? true : false}
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <span className="text-red-500 m-0">
                {errors.confirmPassword.message}
              </span>
            )}
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
