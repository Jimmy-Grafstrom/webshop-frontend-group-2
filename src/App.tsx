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

export function App() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductsDetailsPage />} />
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
