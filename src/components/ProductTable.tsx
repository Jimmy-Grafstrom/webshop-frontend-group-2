import type {ProductResponse} from "../types/ProductResponse.ts";
import {useState} from "react";

interface Props {
    products: ProductResponse[];
}

export const ProductTable = ({products}: Props) => {
    const [searchTerm, setSearchTerm] = useState("");
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.id.toString().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-4">
            <input
                type="text"
                placeholder="Sök på produktnamn eller ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-72 px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-1 focus:ring-slate-400"
            />

            <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="border-b border-slate-200 text-sm font-semibold text-slate-800 bg-slate-50">
                    <tr>
                        <th className="p-3">ID</th>
                        <th className="p-3">Namn</th>
                        <th className="p-3">Pris</th>
                        <th className="p-3">Lagerstatus</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
                    {filteredProducts.map((product) => (
                        <tr key={product.id}>
                            <td className="p-3 text-slate-400 font-mono text-xs">{product.id}</td>
                            <td className="p-3 font-medium text-slate-800">{product.name}</td>
                            <td className="p-3">{product.price} kr</td>
                            <td className="p-3">
                                {product.stock > 0 ? `${product.stock} st` : "0 st (ej i lager)"}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                {filteredProducts.length === 0 && (
                    <div className="p-8 text-center text-slate-500 text-sm">
                        Inga produkter hittades.
                    </div>
                )}
            </div>
        </div>
    );
};