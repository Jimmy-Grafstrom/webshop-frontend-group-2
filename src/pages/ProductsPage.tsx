import type { ProductResponse } from "../types/ProductResponse.ts";
import { useEffect, useState } from "react";
import { fetchAllProducts } from "../service/ProductService.ts";
import { ProductCard } from "../components/ProductCard.tsx";
import type { CartItem } from "../types/CartItem.ts";
import { Cart } from "../components/Cart.tsx";
import { createOrder } from "../service/OrderService.ts";

export function ProductsPage() {
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCart = sessionStorage.getItem("cart");

    if (savedCart) {
      return JSON.parse(savedCart);
    }

    return [];
  });
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
    setCartItems((currentItems) => {
      const existing = currentItems.find((item) => item.id === product.id);

      if (existing) {
        return currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...currentItems, { ...product, quantity: 1 }];
    });

    alert(`${product.name} har lagts till i kundvagnen`);
  }

  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  function increaseQuantity(id: number) {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  }

  function decreaseQuantity(id: number) {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      alert("Kundvagnen är tom.");
      return;
    }

    const orderRequest = {
      items: cartItems.map((item) => ({
        id: item.id,
        quantity: item.quantity,
      })),
    };

    try {
      await createOrder(orderRequest);
      setCartItems([]);
      sessionStorage.removeItem("cart")
      alert("Ordern har skapats.");
    } catch {
      alert("Något gick fel när ordern skulle skapas")
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-8 px-4">
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
          onIncrease={increaseQuantity}
          onDecrease={decreaseQuantity}
          onCheckout={handleCheckout}
        />
      )}

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
