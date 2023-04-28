"use client";
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

export default function LoginForm() {
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
      <CardBody className="flex flex-col gap-4">
        <Input label="E-mail" size="lg" />
        <Input label="Senha" size="lg" />
        <div className="-ml-2.5">
          <Checkbox label="Lembrar" />
        </div>
      </CardBody>
      <CardFooter className="pt-0">
        <Button variant="gradient" fullWidth>
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
    </Card>
  );
}
