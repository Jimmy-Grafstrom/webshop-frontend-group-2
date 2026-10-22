import {describe, it, expect, vi} from "vitest";
import {MemoryRouter} from "react-router";
import {render, screen} from "@testing-library/react";
import {http, HttpResponse} from "msw";
import {server} from "../mocks/server";
import {ProductsPage} from "../pages/ProductsPage";

describe("ProductsPage Integration", () => {
    const dummyProps = {
        cartItems: [],
        onAddToCart: vi.fn(),
        onIncrease: vi.fn(),
        onDecrease: vi.fn(),
        onCheckout: vi.fn(),
    };

    it("shows loading text and fetches products from mocked backend", async () => {
        render(
            <MemoryRouter>
                <ProductsPage {...dummyProps} />
            </MemoryRouter>
        );

        const productHeading = await screen.findByRole(
            "heading", {
                name: "Laptop fodral",
            }
        );
        expect(productHeading).toBeInTheDocument();

        expect(
            screen.getByRole("heading", {name: "Laptop fodral"}),
        ).toBeInTheDocument();
    });

    it("shows error message if backend request fails", async () => {
        server.use(
            http.get("*/products", () => {
                return new HttpResponse(null, {status: 500});
            }),
        );

        render(
            <MemoryRouter>
                <ProductsPage { ... dummyProps } />
            </MemoryRouter>,
        );

        const errorMessage = await screen.findByText(/Error fetching products/i);
        expect(errorMessage).toBeInTheDocument();
    })
});