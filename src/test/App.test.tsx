import { render, screen } from "@testing-library/react";
import App from "../App";
import { expect, test } from "vitest";
import { mockProducts } from "../mocks/handlers";
import { MemoryRouter } from "react-router";
import { server } from "../mocks/server";
import { http, HttpResponse } from "msw";



function renderAppAt(path: string) {
    return render (
        <MemoryRouter initialEntries={[ path ]}>
            <App />
        </MemoryRouter>
    );
}

test ("inloggad användare ser produkterna", async () => {
    renderAppAt("/products");

    expect(await screen.findByRole("heading", { name: "Produkter" })).toBeInTheDocument();

    expect(await screen.findByText(mockProducts[0].name)).toBeInTheDocument();
    expect(screen.getByText(mockProducts[1].name)).toBeInTheDocument();
    expect(screen.queryByText("Laddar produkter...")).not.toBeInTheDocument();
});

test ("visar felmeddelande när produkterna inte kan hämtas", async () => {
    server.use(
        http.get("*/products", () => new HttpResponse(null, { status: 500 })),
    );

    renderAppAt("/products");

    expect(await screen.findByText("Ett fel uppstod vid hämtning av produkter:")).toBeInTheDocument();
    expect(screen.queryByText(mockProducts[0].name)).not.toBeInTheDocument();
    expect(screen.queryByText("Inga produkter hittades.")).not.toBeInTheDocument();
});