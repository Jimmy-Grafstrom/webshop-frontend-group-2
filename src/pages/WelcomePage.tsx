import { getSubject, getRoles } from "../service/authService";

export function WelcomePage() {
  const subject = getSubject();
  const roles = getRoles();

  return (
    <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm text-center">
      <h1 className="text-2xl font-bold text-indigo-600 mb-4">Välkommen</h1>
      <p className="text-gray-700">
        Inloggad som <strong>{subject}</strong>
      </p>
      <p className="text-gray-500 mt-2">Roll: {roles.join(", ")}</p>
    </div>
  );
}
