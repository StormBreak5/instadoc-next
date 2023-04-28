import LoginForm from "@/app/components/LoginForm";

export default function Login() {
  return (
    <main className="grid h-screen place-items-center ">
      <div className="flex align-middle place-items-center flex-col bg-slate-100 justify-center h-fit w-screen rounded-xl">
        <LoginForm />
      </div>
    </main>
  );
}
