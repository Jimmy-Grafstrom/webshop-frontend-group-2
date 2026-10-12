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
import { getSubject } from "./service/authService.ts";
import type { CartItem } from "./types/CartItem.ts";
import { useEffect, useState } from "react";
import type { ProductResponse } from "./types/ProductResponse.ts";
import { createOrder } from "./service/OrderService.ts";
import { createPayment } from "./service/PaymentService.ts";
import type { CreateOrderRequest } from "./types/Order.ts";

export function App() {
  const subject = getSubject();
  const cartKey = subject ? `cart:${subject}` : null;

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (!cartKey) return [];

    const savedCart = sessionStorage.getItem(cartKey);

    return savedCart ? JSON.parse(savedCart) : [];
  });

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
        items: cartItems.map((item) => ({ id: item.id, quantity: item.quantity })),
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


  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/products" element={<ProductsPage
            cartItems={cartItems}
            onAddToCart={addToCart}
            onIncrease={increaseQuantity}
            onDecrease={decreaseQuantity}
            onCheckout={handleCheckout} />} />
            <Route path="/products/:id" element={<ProductsDetailsPage onAddToCart={addToCart} />} />
            <Route path="/welcome" element={<WelcomePage />} />
            <Route path="/payment-success" element={<PaymentSuccessPage />} />
            <Route path="/payment-cancel" element={<PaymentCancelPage />} />
          </Route>

          <Route element={<ProtectedRoute requiredRole={"ADMIN"} />}>
            <Route path={"/admin"} element={<AdminPage />} />
            <Route path="/admin/add" element={<AdminAddProductPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
