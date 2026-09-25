import type { ProductResponse } from "../types/ProductResponse.ts";
import { useEffect, useState } from "react";
import { fetchAllProducts } from "../service/ProductService.ts";
import { ProductCard } from "../components/ProductCard.tsx";
import type { CartItem } from "../types/CartItem.ts";
import { Cart } from "../components/Cart.tsx";

export function ProductsPage() {
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
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

  function addToCart(product: ProductResponse) {
    const cartItem: CartItem = {
      ...product,
      quantity: 1,
    };

    setCartItems((currentItems) => [...currentItems, cartItem]);

    alert(`${product.name} har lagts till i kundvagnen`);
  }

  return (
    <div className="w-full max-w-6xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Produkter</h1>
        <p className="text-slate-600 mt-1">
          Välkommen till sidan för dig som letar efter marknadens bästa
          produkter
        </p>
      </div>

      <button onClick={() => setShowCart(!showCart)} className="border-2 rounded-lg p-1 px-3 py-1.5 bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 cursor-pointer mb-4">
        {showCart ? "Dölj kundvagn" : "Visa kundvagn"}
      </button>

      {showCart && <Cart items={cartItems} />}

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

      {!isLoading && !error && products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onAdd={addToCart} />
          ))}
        </div>
      )}
    </div>
  );
}
