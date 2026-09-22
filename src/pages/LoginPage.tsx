import { LoginForm } from "../components/LoginForm";

export function LoginPage() {
  return (
    <div className="bg-white p-8 rounded-x1 shadow-md w-full max-w-sm">
      <h1 className="text-2x1 font-bold text-indigo-600 text-center mb-6">
        Logga in
      </h1>
      <LoginForm />
    </div>
  );
}
