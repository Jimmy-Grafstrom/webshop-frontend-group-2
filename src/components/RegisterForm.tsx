import { useState } from "react";
import { useNavigate } from "react-router";
import { register } from "../service/authService";

const inputClass =
  "w-full min-w-0 border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500";

export function RegisterForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Lösenorden matchar inte");
      return;
    }

    try {
      setIsLoading(true);
      await register({ username, password });
      navigate("/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Något gick fel");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        className={inputClass}
        placeholder="Användarnamn"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        className={inputClass}
        type="password"
        placeholder="Lösenord"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input
        className={inputClass}
        type="password"
        placeholder="Bekräfta lösenord"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-lg py-2 bg-indigo-600 text-white font-medium hover:bg-indigo-700 disabled:opacity-50 cursor-pointer"
      >
        {isLoading ? "Skapar konto..." : "Registrera"}
      </button>
    </form>
  );
}