import {useEffect, useState} from "react"

import type {ProductResponse} from "../types/ProductResponse.ts";
import {fetchAllProducts} from "../service/ProductService.ts";
import {ProductTable} from "../components/ProductTable.tsx";

export const AdminPage = () => {
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
        <div>
            <div>
                <div>
                    <h1>Admin</h1>
                    <p>
                        Översikt över produkter och lagersaldo.
                    </p>
                </div>
            </div>

            {isLoading && (
                <div>
                    Laddar produkter...
                </div>
            )}

            {error && (
                <div>
                    Fel vid hämtning av produkter: {error}
                </div>
            )}

            {!isLoading && !error && <ProductTable products={products}/>}
        </div>
    );
}