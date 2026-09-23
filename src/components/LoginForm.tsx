import { useState } from "react";
import { login } from "../service/authService";
import { useNavigate } from "react-router";

export function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      await login({ username, password });
      navigate("/welcome");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Användarnamn"
        className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Lösenord"
        className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <button
        type="submit"
        className="bg-indigo-600 text-white rounded-lg px-4 py-2 hover:bg-indigo-700 transition"
      >
        Logga in
      </button>
      {error && (
        <p role="alert" className="text-red-600 text-sm text-center">
          {error}
        </p>
      )}
    </form>
  );
}
