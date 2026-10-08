import { useEffect } from "react";
import { Link } from "react-router";

export function PaymentSuccessPage() {
  useEffect(() => {
    sessionStorage.removeItem("cart");
  }, []);

  return (
    <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm text-center self-start mt-2">
      <h1 className="text-2xl font-bold text-green-600 mb-4">
        Betalning genomförd
      </h1>
      <p className="text-gray-700 mb-4">
        Tack för ditt köp!
      </p>
      <Link to="/products" className="text-indigo-600 hover:text-indigo-800">
        Tillbaka till produktsidan
      </Link>
    </div>
  );
}    