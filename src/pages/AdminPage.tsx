import {useEffect, useState} from "react"
import { useLocation } from "react-router";

import type {ProductResponse} from "../types/ProductResponse.ts";
import {fetchAllProducts} from "../service/ProductService.ts";
import {ProductTable} from "../components/ProductTable.tsx";
import {Link} from "react-router";

export const AdminPage = () => {
    const location = useLocation();
    const message = location.state?.message as string | undefined;

    const [products, setProducts] = useState<ProductResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const loadProducts = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const data = await fetchAllProducts();
                if (isMounted) {
                    setProducts(data);
                }
            } catch (error) {
                if (isMounted) {
                    setError(error instanceof Error ? error.message : "Kunde inte hämta produkter");
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        }
        loadProducts();
        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <div className="w-full max-w-6xl mx-auto py-8 px-4 self-start mt-2">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-slate-800">Admin</h1>
                <p className="text-slate-600 mt-1">
                    Översikt över produkter och lagersaldo.
                </p>
            </div>

                {message && (
                    <div className="p-4 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm mb-4">
                        {message}
                    </div>
                )}

            {
                isLoading && (
                    <div className="p-8 text-center text-slate-500 bg-white rounded-lg border border-slate-200">
                        Laddar produkter...
                    </div>
                )
            }

            {
                error && (
                    <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm mb-4">
                        Fel vid hämtning av produkter: {error}
                    </div>
                )
            }

            {
                !isLoading && !error && (
                    <ProductTable
                        products={products}
                        actions={
                            <Link
                                to={"/admin/add"}
                                className={"px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors"}
                            >
                                Lägg till ny produkt
                            </Link>
                        }
                    />
                )}
        </div>
    )
}