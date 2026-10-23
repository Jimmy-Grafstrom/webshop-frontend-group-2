import { afterEach, afterAll, beforeAll } from "vitest";
import { cleanup } from "@testing-library/react";
import { server } from "../mocks/server";
import "@testing-library/jest-dom/vitest";


afterEach (() => {
    cleanup();
    server.resetHandlers();
    sessionStorage.clear();
});
afterAll(() => server.close());
beforeAll(() => server.listen({onUnhandledRequest: 'error'}));