import type { ProductResponse } from "../types/ProductResponse.ts";

interface ProductCardProps {
    product: ProductResponse;
}

export function ProductCard({ product }: ProductCardProps) {
    const isInStock = product.stock > 0;

    return (
        <article className="bg-white rounded-lg border border-slate-200 p-5 flex flex-col justify-between shadow-sm hover:shadow transition-shadow">
            {/* Name & description */}
            <div>
                <h2 className="text-lg font-semibold text-slate-800">{product.name}</h2>
                <p className="text-sm text-slate-600 mt-2 line-clamp-3">{product.description}</p>
            </div>

            {/* Price & stock */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                    <span className="text-xl font-bold text-slate-900 block">{product.price} kr</span>
                    <span className={`text-xs font-medium ${isInStock ? "text-emerald-600" : "text-rose-600"}`}>
                        {isInStock ? "I lager" : "Ej i lager"}
                    </span>
                </div>

                {/* Add to cart button */}
                <button
                    disabled={!isInStock}
                    className="px-3 py-1.5 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                    Lägg till i kundvagn
                </button>
            </div>
        </article>
    );
}