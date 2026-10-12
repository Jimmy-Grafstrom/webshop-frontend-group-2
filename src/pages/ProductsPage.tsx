import type { ProductResponse } from "../types/ProductResponse.ts";
import { useEffect, useState } from "react";
import { fetchAllProducts } from "../service/ProductService.ts";
import { ProductCard } from "../components/ProductCard.tsx";
import { Cart } from "../components/Cart.tsx";
import {ProductFilterBar} from "../components/ProductFilterBar.tsx";
import type { CartItem } from "../types/CartItem.ts";

type ProductsPageProps = {
  cartItems: CartItem[];
  onAddToCart: (product: ProductResponse) => void;
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  onCheckout: () => Promise<void>;
};

export function ProductsPage({
  cartItems,
  onAddToCart,
  onIncrease,
  onDecrease,
  onCheckout,
}: ProductsPageProps) {
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadProducts() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchAllProducts();
        if (isMounted) {
          setProducts(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error ? err.message : "Could not fetch products",
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }
    loadProducts();

    return () => {
      isMounted = false;
    };
  }, []);


  const filteredProducts = products.filter((product) => {
    // 1. Kategorifilter: Om "ALL" visas allt, annars bara vald kategori
    const matchesCategory =
        selectedCategory === "ALL" || product.category === selectedCategory;

    // 2. Textsökning: Skiftlägesokänsligt i BÅDE namn och beskrivning
    const term = searchTerm.trim().toLowerCase();
    const matchesSearch =
        term === "" ||
        product.name.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term);

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full max-w-6xl mx-auto py-8 px-4 self-start mt-2">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Produkter</h1>
        <p className="text-slate-600 mt-1">
          Välkommen till sidan för dig som letar efter marknadens bästa
          produkter
        </p>
      </div>

      <button
        onClick={() => setShowCart(!showCart)}
        className="border-2 rounded-lg p-1 px-3 py-1.5 bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 cursor-pointer mb-4"
      >
        {showCart ? "Dölj kundvagn" : "Visa kundvagn"}
      </button>

      {showCart && (
        <Cart
          items={cartItems}
          onIncrease={onIncrease}
          onDecrease={onDecrease}
          onCheckout={onCheckout}
        />
      )}

      <ProductFilterBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          onReset={() => {
            setSearchTerm("");
            setSelectedCategory("ALL");
          }}
      />

      {isLoading && (
        <div className="py-12 text-center text-slate-500">
          Laddar produkter...
        </div>
      )}

      {error && (
        <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-center">
          <p className="font-semibold">
            Ett fel uppstod vid hämtning av produkter:
          </p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      )}

      {!isLoading && !error && products.length === 0 && (
        <div className="p-8 text-center text-slate-500 bg-white rounded-lg border border-slate-200">
          Inga produkter hittades.
        </div>
      )}

      {!isLoading && !error && products.length > 0 && filteredProducts.length === 0 && (
          <div className="p-8 text-center text-slate-500 bg-white rounded-lg border border-slate-200">
            <p className="font-medium text-slate-700">Inga produkter matchade din sökning.</p>
            <p className="text-sm mt-1 text-slate-500">
              Testa att söka på något annat eller ändra kategori.
            </p>
          </div>
      )}

      {!isLoading && !error && filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} onAdd={onAddToCart} />
            ))}
          </div>
      )}
    </div>
  );
}
