import {CATEGORIES, type ProductResponse} from "../types/ProductResponse.ts";
import {useState, Fragment} from "react";

interface Props {
    products: ProductResponse[];
    actions?: React.ReactNode;
}

export const ProductTable = ({products, actions}: Props) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
    const [expandedId, setExpandedId] = useState<number | null>(null);
    const filteredProducts = products.filter((p) => {
        const matchCategory =
            selectedCategory === "ALL" || p.category === selectedCategory;

        const t = searchTerm.trim().toLowerCase();
        const matchSearch =
            t === "" ||
            p.name.toLowerCase().includes(t) ||
            p.id.toString().includes(t) ||
            p.description.toLowerCase().includes(t);

        return matchCategory && matchSearch;
    });
    const toggleRow = (id: number) => {
        setExpandedId((prev) => (prev === id ? null : id));
    };

    const getCategoryLabel = (category?: string) => {
        return CATEGORIES.find((c) => c.value === category)?.label || category || "-";
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center gap-4">
            <input
                type="text"
                placeholder="Sök på produktnamn eller ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-72 px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-1 focus:ring-slate-400"
            />
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 text-sm border rounded-lg bg-white"
                >
                    <option value="ALL">Alla kategorier</option>
                    {CATEGORIES.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                            {cat.label}
                        </option>
                    ))}
                </select>
                {actions && <div>{actions}</div>}
            </div>



            <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="border-b border-slate-200 text-sm font-semibold text-slate-800 bg-slate-50">
                    <tr>
                        <th className="p-3">ID</th>
                        <th className="p-3">Namn</th>
                        <th className="p-3">Kategori</th>
                        <th className="p-3">Pris</th>
                        <th className="p-3">Lagerstatus</th>
                        <th className="p-3 text-right">Detaljer</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
                    {filteredProducts.map((p) => (
                        <Fragment key={p.id}>
                            <tr key={p.id}>
                                <td className="p-3 text-xs font-mono">{p.id}</td>
                                <td className="p-3 font-medium">{p.name}</td>
                                <td className="p-3 text-xs">{getCategoryLabel(p.category)}</td>
                                <td className="p-3">{p.price} kr</td>
                                <td className="p-3">{p.stock > 0 ? `${p.stock} st` : "Ej i lager"}</td>
                                <td className="p-3 text-right">
                                    <button
                                        onClick={() => toggleRow(p.id)}
                                        className="text-xs text-indigo-600 hover:text-indigo-800"
                                    >
                                        {expandedId === p.id ? "Dölj" : "Visa mer"}
                                    </button>
                                </td>
                            </tr>

                            {expandedId === p.id && (
                                <tr className="bg-slate-50">
                                    <td colSpan={6} className="p-4 border-b border-slate-100">
                                        <div>
                                            <h4 className="font-semibold text-xs text-slate-500 uppercase tracking-wider mb-1">
                                                Beskrivning
                                            </h4>
                                            <p className="text-sm text-slate-700 leading-relaxed">
                                                {p.description}
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </Fragment>
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