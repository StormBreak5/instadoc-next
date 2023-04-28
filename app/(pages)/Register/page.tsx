import UserForm from "@/app/components/UserForm";

export default function Register() {
  return (
    <main className="grid h-screen place-items-center ">
      <div className="flex align-middle place-items-center flex-col bg-slate-100 justify-center h-fit w-screen rounded-xl">
        <UserForm />
      </div>
    </main>
  );
}
