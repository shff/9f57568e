import { describe, it, expect, vi } from "vitest";
import { createRoot } from "react-dom/client";

vi.mock("react-dom/client", () => ({
  createRoot: vi.fn(() => ({
    render: vi.fn(),
  })),
}));

describe("Main", () => {
  it("renders main.tsx without errors", async () => {
    const rootMock = document.createElement("div");
    rootMock.id = "root";
    document.body.appendChild(rootMock);

    await import("./main");

    expect(createRoot).toHaveBeenCalledWith(rootMock);
  });
});
