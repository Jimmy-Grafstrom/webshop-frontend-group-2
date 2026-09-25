import type { CartItem } from "../types/CartItem";

type CartProps = {
    items: CartItem[];
};

export const Cart = ({items}: CartProps) => {
    if (items.length === 0) {
        return <p className="text-slate-500 text-sm mb-4"> Din kundvagn är tom.</p>;
    }

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="bg-white rounded-lg border border-slate-200 p-5 mt-4 mb-4">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Kundvagn</h2>

            <ul className="space-y-2">
                {items.map((item) => (
                    <li key={item.id} className="flex justify-between text-sm">
                        <span>{item.name} - {item.quantity}</span>
                        <span>{item.price * item.quantity} kr</span>
                    </li>
                ))}
            </ul>

                <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between font-semibold">
                    <span>Totalt</span>
                    <span>{total} kr</span>
                </div>
        </div>

    );
}
