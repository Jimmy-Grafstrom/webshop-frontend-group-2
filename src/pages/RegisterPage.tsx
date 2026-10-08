import { Link } from "react-router";
import { RegisterForm } from "../components/RegisterForm";

export function RegisterPage() {
  return (
    <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-lg border border-slate-200 w-full max-w-sm">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Skapa konto</h2>
        <p className="text-slate-500 text-sm mt-2">Registrera dig för att börja handla</p>
      </div>

      <RegisterForm />

      <p className="text-center text-sm text-slate-500 mt-6">
        Har du redan ett konto?{" "}
        <Link
          to="/login"
          className="font-medium text-indigo-600 hover:text-indigo-700 hover:underline"
        >
          Logga in
        </Link>
      </p>
    </div>
  );
}