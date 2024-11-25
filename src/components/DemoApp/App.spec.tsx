import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

// Mock json file to avoid needing external test data
vi.mock("../../assets/projects.json", () => ({
  default: [
    { id: 1, name: "Project 1", description: "Description 1" },
    { id: 2, name: "Project 2", description: "Description 2" },
  ],
}));

// Mock Comments component to avoid needing testing it here
vi.mock("../Comments/Comments", () => ({
  __esModule: true,
  default: () => <div>Comments section</div>,
}));

describe("App Component", () => {
  it("renders the header, card list, and footer", () => {
    render(<App />);
    expect(screen.getByText("Projects App")).toBeInTheDocument();
    expect(screen.getByText("Welcome to Your Projects")).toBeInTheDocument();
    expect(screen.getByText("Made with:")).toBeInTheDocument();
  });

  it("renders the project cards with correct project names", () => {
    render(<App />);
    expect(screen.getByText("Project 1")).toBeInTheDocument();
    expect(screen.getByText("Project 2")).toBeInTheDocument();
  });

  it("opens the modal with the correct project details when a project card is clicked", async () => {
    render(<App />);
    fireEvent.click(screen.getAllByText("💬")[0]);
    expect(screen.getByText(`Comments for Project 1`)).toBeInTheDocument();
  });

  it("closes the modal when the close button is clicked", async () => {
    render(<App />);
    fireEvent.click(screen.getAllByText("💬")[0]);
    expect(screen.getByText(`Comments for Project 1`)).toBeInTheDocument();
    fireEvent.click(screen.getByText("Close"));
    expect(screen.queryByText(`Comments for Project 1`)).not.toBeInTheDocument();
  });
});
