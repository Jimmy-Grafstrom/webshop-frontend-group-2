import { useNavigate } from "react-router";
import { ProductForm, type NewProduct } from "../components/ProductForm";
import { createProduct } from "../service/ProductService";

export function AdminAddProductPage() {
  const navigate = useNavigate();

  async function handleCreate(product: NewProduct) {
    await createProduct(product);
    navigate("/admin", {
      replace: true,
      state: { message: `Produkten "${product.name}" har lagts till` },
    });
  }

  return (
    <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md self-start mt-2">
      <h1 className="text-2xl font-bold text-indigo-600 text-center mb-6">
        Lägg till produkt
      </h1>
      <ProductForm onSubmit={handleCreate} />
    </div>
  );
}
