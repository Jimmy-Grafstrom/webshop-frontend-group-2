import { Link } from "react-router";

export function HomePage() {
  return (
    <div className="w-full max-w-5xl mx-auto self-start py-10 px-4">
      <section className="bg-white rounded-xl shadow-md p-10 text-center">
        <h2 className="text-4xl font-bold text-slate-800">
          Välkommen till Group 2 TechShop
        </h2>
        <p className="text-slate-600 mt-4 text-lg max-w-2xl mx-auto">
          Datorer, tillbehör och smarta prylar för din vardag.
        </p>
        <Link
          to="/products"
          className="inline-block mt-8 rounded-lg px-6 py-3 bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700"
        >
          Se våra produkter
        </Link>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
        <div className="bg-white p-6 rounded-lg border border-slate-200 text-center">
          <h3 className="font-semibold text-slate-800">Snabb leverans</h3>
          <p className="text-slate-500 text-sm mt-2">Vi skickar inom 1–3 arbetsdagar.</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-slate-200 text-center">
          <h3 className="font-semibold text-slate-800">Trygg betalning</h3>
          <p className="text-slate-500 text-sm mt-2">Säkra betalningar med flera alternativ.</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-slate-200 text-center">
          <h3 className="font-semibold text-slate-800">Öppet köp</h3>
          <p className="text-slate-500 text-sm mt-2">30 dagars öppet köp på alla varor.</p>
        </div>
      </section>
    </div>
  );
}