import { useState } from "react";

export type NewProduct = {
  name: string;
  description: string;
  price: number;
  stock: number;
};

type Props = {
  onSubmit: (product: NewProduct) => Promise<void>;
};

export function ProductForm({ onSubmit }: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  function validate(): string[] {
    const found: string[] = [];
    if (!name.trim()) found.push("Namn får ej vara tomt");
    if (!description.trim()) found.push("Beskrivning får ej vara tomt");
    if (price == "" || Number(price) <= 0)
      found.push("priset måste högre än 0");
    if (stock == "" || !Number.isInteger(Number(stock)) || Number(stock) < 0) {
      found.push("Lagersaldo måste vara ett heltal på 0 eller mer");
    }
    return found;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (found.length > 0) return;

    setSubmitting(true);
    try {
      await onSubmit({
        name: name.trim(),
        description: description.trim(),
        price: Number(price),
        stock: Number(stock),
      });
    } catch (err) {
      if (err instanceof Error) {
        setErrors([err.message]);
      }
    } finally {
      setSubmitting(false);
    }
  }
  const inputClass =
    "border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        className={inputClass}
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Namn"
      />
      <textarea
        className={inputClass}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Beskrivning"
      />
      <input
        className={inputClass}
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Pris"
      />
      <input
        className={inputClass}
        type="number"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        placeholder="Lagersaldo"
      />
      <button
        type="submit"
        disabled={submitting}
        className="bg-indigo-600 text-white rounded-lg px-4 py-2 hover:bg-indigo-700 transition disabled:opacity-50"
      >
        {submitting ? "Sparar" : "Lägg till produkt"}
      </button>
      {errors.length > 0 && (
        <p role="alert" className="text-red-600 text-sm text-center">
          {errors[0]}
        </p>
      )}
    </form>
  );
}
