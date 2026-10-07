import type {CartItem} from "../types/CartItem";

type CartProps = {
  items: CartItem[];
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  onCheckout: () => void;
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
  onCheckout,
}: CartProps) => {
  if (items.length === 0) {
    return <p className="text-slate-500 text-sm mb-4">Din kundvagn är tom.</p>;
  }

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-5 mt-4 mb-4">
      <h2 className="text-lg font-semibold text-slate-800 mb-4">Kundvagn</h2>

      <ul className="space-y-2">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex justify-between items-center text-sm"
          >
            <span>{item.name}</span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onDecrease(item.id)}
                className="px-2 border rounded cursor-pointer"
              >
                −
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => onIncrease(item.id)}
                className="px-2 border rounded cursor-pointer"
              >
                +
              </button>
            </div>

            <span>{formatPrice(item.price * item.quantity)}</span>
          </li>
        ))}
      </ul>

      <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between font-semibold">
        <span>Totalt</span>
        <span>{formatPrice(total)}</span>
      </div>
      <button
        onClick={onCheckout}
        className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded cursor-pointer transition-colors"
      >
        Till betalning
      </button>
    </div>
  );
};
