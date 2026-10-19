import type { User } from "../types/auth";

type WelcomePageProp = {
  user: User | null;
}

export function WelcomePage({user}: WelcomePageProp) {
  const subject = user?.subject;
  const roles = user?.roles ?? [];

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
