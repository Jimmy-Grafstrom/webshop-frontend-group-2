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


function renderApp(path = "/") {
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );
}

function mockMe(subject: string, roles: string[]) {
  server.use(
    http.get("*/auth/me", () =>
      HttpResponse.json({ subject, roles, remainingSeconds: 3600 }),
    ),
  );
}

function mockMeUnauthorized() {
  server.use(
    http.get("*/auth/me", () => new HttpResponse(null, { status: 401 })),
  );
}

describe("Återställning av inloggad användare", () => {
  it("återställer användaren när /auth/me svarar 200", async () => {
    mockMe("test", ["USER"]);
    renderApp();

    expect(
      await screen.findByRole("button", { name: /logga ut/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: /logga in/i }),
    ).not.toBeInTheDocument();
  });

  it("visar admin länken när en admin återställs", async () => {
    mockMe("admin@test.se", ["ADMIN"]);
    renderApp();

    expect(
      await screen.findByRole("link", { name: /admin/i }),
    ).toBeInTheDocument();
  });

  it("stannar på en skyddad sida efter omladdning när användaren är inloggad", async () => {
    mockMe("test", ["USER"]);
    renderApp("/products");

    expect(await screen.findByText("Laptop fodral")).toBeInTheDocument();
  });

  it("visar användaren som utloggad vid 401", async () => {
    mockMeUnauthorized();
    renderApp();

    expect(
      await screen.findByRole("link", { name: /logga in/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /logga ut/i }),
    ).not.toBeInTheDocument();
  });

  it("loggar ut användaren om servern inte svarar", async () => {
    server.use(http.get("*/auth/me", () => HttpResponse.error()));
    renderApp();

    expect(
      await screen.findByRole("link", { name: /logga in/i }),
    ).toBeInTheDocument();
  });
});
})