import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import type { ProductResponse } from "../types/ProductResponse";
import { fetchProductsById } from "../service/ProductService";

export function ProductsDetailsPage() {
  const { id } = useParams();

  const [product, setProduct] = useState<ProductResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadProduct() {
      if (!id || !Number.isInteger(Number(id))) {
        setNotFound(true);
        setIsLoading(false);
        return;
      }

      try {
        const result = await fetchProductsById(Number(id));
        if (isMounted) {
          setProduct(result);
          setNotFound(result === null);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error ? err.message : "Could not fetch product",
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadProduct();

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (isLoading) return <p>Laddar produkt...</p>;
  if (error) return <p role="alert">Kunde inte hämta produkten: {error}</p>;
  if (notFound || !product) return <p>Produkten hittades inte.</p>;

  return (
    <article className="bg-white rounded-lg border border-slate-200 p-5 flex flex-col justify-between shadow-sm hover:shadow transition-shadow self-start mt-2">
      {product.imageUrl ? (
        <img
          src={product.imageUrl}
          alt={product.name}
          className="mb-4 max-h-96 rounded-lg object-cover"
        />
      ) : (
        <div className="mb-4 flex h-64 items-center justify-center rounded-lg bg-slate-100 text-slate-400">
          Ingen bild tillgänglig
        </div>
      )}
      <p className="text-md text-slate-600 mt-2 line-clamp-3">
        {product.category}
      </p>
      <h1 className="text-lg font-semibold text-slate-800">{product.name}</h1>
      <p className="text-sm text-slate-600 mt-2 line-clamp-3">
        {product.description}
      </p>
      <p className="text-xl font-bold text-slate-900 block">
        {product.price} kr
      </p>
      <p className={`text-xs font-medium`}>
        {product.stock > 0 ? "I lager" : "Ej i lager"}
      </p>
      <div className="flex items-center gap-2">
        <Link
          to="/products"
          className="px-3 py-1.5 rounded-md border border-indigo-600 text-indigo-600 text-sm font-medium hover:bg-indigo-50 mt-2"
        >
          Tillbaka till produkter
        </Link>
      </div>
    </article>
  );
}
