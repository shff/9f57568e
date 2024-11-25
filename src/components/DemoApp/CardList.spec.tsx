import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import CardList from "./CardList";
import "@testing-library/jest-dom";

describe("CardList Component", () => {
  it("renders the title correctly", () => {
    render(
      <CardList title="Test Title" items={[]}>
        {(_, idx) => <div key={idx} />}
      </CardList>
    );
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("displays the correct number of items", () => {
    render(
      <CardList title="Test" items={[1, 2, 3]}>
        {(_, idx) => <div key={idx}>Item</div>}
      </CardList>
    );
    expect(screen.getByText("3 items found.")).toBeInTheDocument();
  });

  it("renders the items using the children function", () => {
    render(
      <CardList title="Test" items={["Item 1", "Item 2"]}>
        {(item: string) => <div key={item}>{item}</div>}
      </CardList>
    );
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });
});
