import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ProductCard } from "../components/ProductCard";
import type { ProductResponse } from "../types/ProductResponse";
import { MemoryRouter } from "react-router";

describe("Tester av ProductCard", () => {
  const product: ProductResponse = {
    id: 6,
    name: "Computer",
    description: "Complete gaming-computer",
    price: 12000,
    stock: 12,
    category: "COMPUTER",
    imageUrl: "https://example.com/computer.jpg",
  };

  it("Verifierar att produktinformation visas", () => {
    const onAdd = vi.fn();

    render(<MemoryRouter><ProductCard product={product} onAdd={onAdd} /></MemoryRouter>);

    expect(
      screen.getByRole("heading", { name: product.name }),
    ).toBeInTheDocument();

    expect(screen.getByText(product.description)).toBeInTheDocument();

    expect(screen.getByText(`${product.price} kr`)).toBeInTheDocument();

    expect(screen.getByText("I lager")).toBeInTheDocument();
  });

  it("Testar att onAdd anropas med rätt produkt", () => {
    const onAdd = vi.fn();

    render(<MemoryRouter><ProductCard product={product} onAdd={onAdd} /></MemoryRouter>);

    fireEvent.click(screen.getByText("Lägg till i kundvagn"));

    expect(onAdd).toHaveBeenCalledWith(product);
    expect(onAdd).toHaveBeenCalledTimes(1);
  });

  it("Testar om en produkt inte finns i lager", () => {
    
    const productWithoutStock: ProductResponse = {
        ...product,
        stock:0
    };

    const onAdd = vi.fn();

    render(<MemoryRouter><ProductCard product={productWithoutStock} onAdd={onAdd} /></MemoryRouter>);

    const button = screen.getByRole("button", {name: "Lägg till i kundvagn"});

    fireEvent.click(button);
    
    expect(onAdd).not.toHaveBeenCalled();
    expect(button).toBeDisabled();
    expect(screen.getByText("Ej i lager")).toBeInTheDocument();
  })
});
