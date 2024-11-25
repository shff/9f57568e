import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "./Header";

describe("Header Component", () => {
  const links = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  it("displays the application title", () => {
    render(<Header links={[]} />);
    expect(screen.getByText("Projects App")).toBeInTheDocument();
  });

  it("renders all navigation links with correct labels and hrefs", () => {
    render(<Header links={links} />);
    links.forEach(({ label, href }) => {
      const linkElement = screen.getByText(label);
      expect(linkElement).toBeInTheDocument();
      expect(linkElement).toHaveAttribute("href", href);
    });
  });

  it("renders an empty navigation when no links are provided", () => {
    render(<Header links={[]} />);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
