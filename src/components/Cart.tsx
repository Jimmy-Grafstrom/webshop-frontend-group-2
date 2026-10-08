import type { CartItem } from "../types/CartItem";
import { createOrder } from "../service/OrderService";
import { createPayment } from "../service/PaymentService";
import type { CreateOrderRequest } from "../types/Order";

type CartProps = {
  items: CartItem[];
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
};

const formatPrice = (value: number) =>
  new Intl.NumberFormat("sv-SE", {
    style: "currency",
    currency: "SEK",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);

export const Cart = ({
  items,
  onIncrease,
  onDecrease,
}: CartProps) => {
  if (items.length === 0) {
    return <p className="text-slate-500 text-sm mb-4">Din kundvagn är tom.</p>;
  }

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleCheckout = async () => {
    try {
      const orderPayload: CreateOrderRequest = {
        items: items.map((item) => ({ id: item.id, quantity: item.quantity })),
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
    <div className="bg-white rounded-lg border border-slate-200 p-5 mt-4 mb-4">
      <h2 className="text-lg font-semibold text-slate-800 mb-4">Kundvagn</h2>

      <ul className="space-y-2">
        {items.map((item) => (
          <li
            key={item.id}
            className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 text-sm"
          >
            <span>{item.name}</span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onDecrease(item.id)}
                className="px-2 border rounded cursor-pointer"
              >
                −
              </button>
              <span className="w-6 text-center">{item.quantity}</span>
              <button
                onClick={() => onIncrease(item.id)}
                className="px-2 border rounded cursor-pointer"
              >
                +
              </button>
            </div>

            <span className="text-right">
              {formatPrice(item.price * item.quantity)}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between font-semibold">
        <span>Totalt</span>
        <span>{formatPrice(total)}</span>
      </div>
      <button
        onClick={handleCheckout}
        className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded cursor-pointer transition-colors"
      >
        Till betalning
      </button>
    </div>
  );
};