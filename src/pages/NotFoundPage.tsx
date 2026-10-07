import { Link } from "react-router";

export function NotFoundPage() {
  return (
    <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-lg border border-slate-200 w-full max-w-md text-center">
      <p className="text-6xl font-bold text-indigo-600">404</p>
      <h2 className="text-2xl font-bold text-slate-800 mt-4">Sidan hittades inte</h2>
      <p className="text-slate-500 text-sm mt-2">
        Sidan du letar efter finns inte eller har flyttats.
      </p>
      <Link
        to="/"
        className="inline-block mt-8 rounded-lg px-6 py-3 bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700"
      >
        Tillbaka till startsidan
      </Link>
    </div>
  );
}