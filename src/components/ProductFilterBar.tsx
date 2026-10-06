import { CATEGORIES } from "../types/ProductResponse.ts";

interface Props {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
    onReset: () => void;
}

export const ProductFilterBar = ({
                                     searchTerm,
                                     onSearchChange,
                                     selectedCategory,
                                     onCategoryChange,
                                     onReset,
                                 }: Props) => {
    const isFiltered = searchTerm !== "" || selectedCategory !== "ALL";

    return (
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <input
                type="text"
                placeholder="Sök på namn eller beskrivning..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="flex-1 px-4 py-2 text-sm border border-slate-200 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />

            <select
                value={selectedCategory}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="px-4 py-2 text-sm border border-slate-200 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
                <option value="ALL">Alla kategorier</option>
                {CATEGORIES.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                        {cat.label}
                    </option>
                ))}
            </select>

            {isFiltered && (
                <button
                    onClick={onReset}
                    className="text-xs text-slate-500 hover:text-slate-700 underline self-center cursor-pointer"
                >
                    Rensa filter
                </button>
            )}
        </div>
    );
};