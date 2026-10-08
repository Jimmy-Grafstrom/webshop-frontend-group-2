import { useState } from "react";
import type { ProductResponse } from "../types/ProductResponse.ts";
import { Link } from "react-router";

interface ProductCardProps {
  product: ProductResponse;
  onAdd: (product: ProductResponse) => void;
}

const priceFormatter = new Intl.NumberFormat("sv-SE", {
  maximumFractionDigits: 2,
});

export function ProductCard({ product, onAdd }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  const showImage = product.imageUrl && !imageError;
  const isInStock = product.stock > 0;

  return (
    <article className="bg-white rounded-lg border border-slate-200 p-5 flex flex-col justify-between shadow-sm hover:shadow transition-shadow">
      {/*Image & Name & description side by side*/}
      <div className="flex gap-4">
        {showImage ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-20 h-20 object-cover rounded-md shrink-0"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-20 h-20 bg-slate-100 rounded-md shrink-0 flex items-center justify-center text-slate-300 text-xs text-center">
            Ingen bild
          </div>
        )}

        <div>
          <h2 className="text-lg font-semibold text-slate-800">
            {product.name}
          </h2>
          <p className="text-sm text-slate-600 mt-2 line-clamp-3">
            {product.description}
          </p>
        </div>
      </div>

      {/* Price & stock */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col gap-3">
        <div>
          <span className="block text-xl font-bold tabular-nums text-slate-900">
            {priceFormatter.format(product.price)} kr
          </span>
          <span
            className={`text-xs font-medium ${isInStock ? "text-emerald-600" : "text-rose-600"}`}
          >
            {isInStock ? "I lager" : "Ej i lager"}
          </span>
        </div>

        {/* Read More button */}
        <div className="flex items-center gap-2">
          <Link
            to={`/products/${product.id}`}
            className="px-3 py-1.5 rounded-md border border-indigo-600 text-indigo-600 text-sm font-medium hover:bg-indigo-50"
          >
            Läs mer
          </Link>

          {/* Add to cart button */}
          <button
            disabled={!isInStock}
            onClick={() => onAdd(product)}
            className="px-3 py-1.5 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            Lägg till i kundvagn
          </button>
        </div>
      </div>
    </article>
  );
}
