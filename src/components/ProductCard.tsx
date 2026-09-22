import type { ProductResponse } from "../types/ProductResponse.ts";

interface ProductCardProps {
    product: ProductResponse;
}

export function ProductCard({ product }: ProductCardProps) {
    const isInStock = product.stock > 0;

    return (
        <article className={ ""}>
            // Name & description
            <div className={""}>
                <h2 className={""}>{product.name}</h2>
                <p className={""}>{product.description}</p>
            </div>

            // Price & stock
            <div>
                <div>
                    <span>{product.price} kr</span>
                    <span>{isInStock ? "I lager" : "Ej i lager"}</span>
                </div>

                // Add to cart button
                <button
                    disabled={!isInStock}
                    className=""
                > Lägg till i kundvagn
                </button>
            </div>
        </article>
    );
}