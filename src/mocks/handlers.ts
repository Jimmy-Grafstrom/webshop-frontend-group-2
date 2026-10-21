import { http, HttpResponse } from "msw";

export const mockProducts = [
  {
    id: 1,
    name: "Laptop fodral",
    description: "ett svart laptop fodral",
    price: 149,
    stock: 10,
    category: "ACCESSORY",
    imageUrl: "",
  },
  {
    id: 2,
    name: "Laptop",
    description: "Gaming laptop",
    price: 9990,
    stock: 0,
    category: "COMPUTER",
    imageUrl: "https://example.com/laptop.jpg",
  },
];

export const handlers = [
  http.get("*/products", () => HttpResponse.json(mockProducts)),

  http.get("*/products/:id", ({ params }) => {
    const product = mockProducts.find((p) => p.id === Number(params.id));
    return product
      ? HttpResponse.json(product)
      : new HttpResponse(null, { status: 404 });
  }),

  http.get("*/auth/me", ({ request }) => {
    const auth = request.headers.get("Authorization");
    if (!auth?.startsWith("Bearer ")) {
      return new HttpResponse(null, { status: 401 });
    }
    return HttpResponse.json({ subject: "admin@example.com", roles: ["ADMIN"] });
  }),
];