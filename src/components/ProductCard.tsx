import type { ProductResponse } from "../types/ProductResponse.ts";

interface ProductCardProps {
    product: ProductResponse;
}

export function ProductCard({ product }: ProductCardProps) {
    const isInStock = product.stock > 0;

    return (
        <article>
            // Name & description
            <div>

            </div>

            // Price & stock
            <div>
                <div>

                </div>

                // Add to cart button
                <button>

                </button>
            </div>
        </article>
    );
}