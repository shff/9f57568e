import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Footer from "./Footer";

describe("Footer Component", () => {
  it('displays the "Made with:" heading', () => {
    render(<Footer />);
    expect(screen.getByText("Made with:")).toBeInTheDocument();
  });

  it("renders the React logo with the correct alt text", () => {
    render(<Footer />);
    const reactLogo = screen.getByAltText("React Logo");
    expect(reactLogo).toBeInTheDocument();
  });

  it("renders the Vite logo with the correct alt text", () => {
    render(<Footer />);
    const viteLogo = screen.getByAltText("Vite Logo");
    expect(viteLogo).toBeInTheDocument();
  });
});
