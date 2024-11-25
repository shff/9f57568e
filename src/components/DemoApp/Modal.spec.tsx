import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Modal from "./Modal";

describe("Modal Component", () => {
  it("renders the modal with the correct title", () => {
    render(
      <Modal title="Test Modal" close={() => {}}>
        <></>
      </Modal>
    );
    expect(screen.getByText("Test Modal")).toBeInTheDocument();
  });

  it("renders the children content", () => {
    render(
      <Modal title="Test Modal" close={() => {}}>
        <p>Modal content</p>
      </Modal>
    );
    expect(screen.getByText("Modal content")).toBeInTheDocument();
  });

  it("calls the close function when the close button is clicked", () => {
    const closeMock = vi.fn();
    render(
      <Modal title="Test Modal" close={closeMock}>
        <p>Modal content</p>
      </Modal>
    );
    fireEvent.click(screen.getByText("Close"));
    expect(closeMock).toHaveBeenCalled();
  });
});
