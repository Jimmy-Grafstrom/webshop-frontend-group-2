import { Link } from "react-router";
import { LoginForm } from "../components/LoginForm";

export function LoginPage() {
  return (
    <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-lg border border-slate-200 w-full max-w-sm">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-800">
          Välkommen tillbaka
        </h2>
        <p className="text-slate-500 text-sm mt-2">
          Logga in för att fortsätta handla
        </p>
      </div>

      <LoginForm />
       {/* måste fixas: /register finns inte än så den behövs =) */}
      <p className="text-center text-sm text-slate-500 mt-6">
        Har du inget konto?{" "}
        <Link
          to="/register"
          className="font-medium text-indigo-600 hover:text-indigo-700 hover:underline"
        >
          Registrera dig
        </Link>
      </p>
    </div>
  );
}
