import { Routes, Route } from "react-router";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { LoginPage } from "./pages/LoginPage";
import { WelcomePage } from "./pages/WelcomePage";
import { ProductsPage } from "./pages/ProductsPage.tsx";
import { ProtectedRoute } from "./components/ProtectedRoute.tsx";
import { AdminPage } from "./pages/AdminPage.tsx";
import { AdminAddProductPage } from "./pages/AdminAddProductPage.tsx";
import { HomePage } from "./pages/HomePage.tsx";
import { NotFoundPage } from "./pages/NotFoundPage.tsx";
import { ProductsDetailsPage } from "./pages/ProductsDetailsPage.tsx";
import { RegisterPage } from "./pages/RegisterPage.tsx";
import { PaymentSuccessPage } from "./pages/PaymentSuccessPage.tsx";
import { PaymentCancelPage } from "./pages/PaymentCancelPage.tsx";
import type { CartItem } from "./types/CartItem.ts";
import { useEffect, useState, useCallback } from "react";
import type { ProductResponse } from "./types/ProductResponse.ts";
import { createOrder } from "./service/OrderService.ts";
import { createPayment } from "./service/PaymentService.ts";
import type { CreateOrderRequest } from "./types/Order.ts";
import type { User } from "./types/auth";
import type { LoginRequest } from "./types/auth";
import { login, logout, fetchCurrentUser } from "./service/authService.ts";
import { CookieBanner } from "./components/CookieBanner.tsx";
import CookiePage from "./pages/CookiePage.tsx";

export function App() {
  const [user, setUser] = useState<User | null>(null);

  const [authChecked, setAuthChecked] = useState(false);

  const cartKey = user ? `cart:${user.subject}` : null;

  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  async function handleLogin(credentials: LoginRequest) {
    const loggedInUser = await login(credentials);
    const savedCart = sessionStorage.getItem(`cart:${loggedInUser.subject}`);
    setCartItems(savedCart ? JSON.parse(savedCart) : []);
    setUser(loggedInUser);
  }

  async function handleLogout() {
    await logout();
    setUser(null);
    setCartItems([]);
  }

  useEffect(() => {
    fetchCurrentUser()
      .then((currentUser) => {
        if (currentUser) {
          const savedCart = sessionStorage.getItem(
            `cart:${currentUser.subject}`,
          );
          setCartItems(savedCart ? JSON.parse(savedCart) : []);
        }
        setUser(currentUser);
      })
      .finally(() => setAuthChecked(true));
  }, []);

  useEffect(() => {
    if (!user?.expiresIn) {
      return;
    }
    const timer = setTimeout(() => {
      setUser(null);
      setCartItems([]);
    }, user.expiresIn * 1000); //auto-logout, kan ändra inför demot för att visa att det faktiskt fungerar

    return () => clearTimeout(timer);
  }, [user]);

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
    if (cartKey) {
      sessionStorage.setItem(cartKey, JSON.stringify(cartItems));
    }
  }, [cartItems, cartKey]);

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
    try {
      const orderPayload: CreateOrderRequest = {
        items: cartItems.map((item) => ({
          id: item.id,
          quantity: item.quantity,
        })),
      };

      const createdOrder = await createOrder(orderPayload);
      const payment = await createPayment({ orderId: createdOrder.id });

      window.location.href = payment.checkoutUrl;
    } catch (error) {
      console.error("Fel vid utcheckning:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Ett fel uppstod vid betalning.",
      );
    }
  };

  const clearCart = useCallback(() => {
    setCartItems((prev) => (prev.length === 0 ? prev : []));
  }, []);

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <p className="text-slate-500">Laddar...</p>
      </div>
    );
  }

  return (
    <>
      <Header user={user} onLogout={handleLogout} />
      <main className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<ProtectedRoute user={user} />}>
            <Route
              path="/products"
              element={
                <ProductsPage
                  cartItems={cartItems}
                  onAddToCart={addToCart}
                  onIncrease={increaseQuantity}
                  onDecrease={decreaseQuantity}
                  onCheckout={handleCheckout}
                />
              }
            />
            <Route
              path="/products/:id"
              element={<ProductsDetailsPage onAddToCart={addToCart} />}
            />
            <Route path="/welcome" element={<WelcomePage user={user} />} />
            <Route
              path="/payment/success"
              element={<PaymentSuccessPage onClearCart={clearCart} />}
            />
            <Route path="/payment/cancel" element={<PaymentCancelPage />} />
          </Route>

          <Route
            element={<ProtectedRoute user={user} requiredRole={"ADMIN"} />}
          >
            <Route path={"/admin"} element={<AdminPage />} />
            <Route path="/admin/add" element={<AdminAddProductPage />} />
          </Route>
          <Route path="/cookies" element={<CookiePage />}/>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      <CookieBanner />
    </>
  );
}

export default App;
