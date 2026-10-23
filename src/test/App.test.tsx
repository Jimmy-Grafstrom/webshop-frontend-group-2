import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { http, HttpResponse } from "msw";
import { describe, expect, it } from "vitest";
import { server } from "../mocks/server";
import { App } from "../App";

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