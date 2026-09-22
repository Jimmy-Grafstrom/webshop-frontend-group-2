import type {ProductResponse} from "../types/ProductResponse.ts";
import {useEffect, useState } from "react";
import {fetchAllProducts} from "../service/ProductService.ts";
import {ProductCard} from "../components/ProductCard.tsx";

export function ProductsPage() {
    const [products, setProducts] = useState<ProductResponse[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        async function loadProducts() {
            try {
                setIsLoading(true);
                setError(null);
                const data = await fetchAllProducts();
                if (isMounted) {
                    setProducts(data);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err instanceof Error ? err.message : "Could not fetch products");
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
                <h1>Produkter</h1>
                <p>Välkommen till sidan för dig som letar efter marknadens bästa produkter</p>
            </div>

            {isLoading && (
                <div>
                    Laddar produkter...
                </div>
            )}

            {error && (
                <div>
                    <p>Ett fel uppstod vid hämtning av produkter:</p>
                    <p>{error}</p>
                </div>
            )}

            {!isLoading && !error && products.length === 0 && (
                <div>
                    Finns inga produkter hittades.
                </div>
            )}

            {!isLoading && !error && products.length > 0 && (
                <div>
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}

        </div>
    )
}