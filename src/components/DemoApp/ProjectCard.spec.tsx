import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProjectCard from "./ProjectCard";

describe("ProjectCard Component", () => {
  const item = {
    id: 1,
    name: "Project Alpha",
    location: "Berlin, Germany",
    workers: 10,
    total: 5000,
    estimate: 120,
  };

  it("renders the project name", () => {
    render(<ProjectCard item={item} onClick={() => {}} />);
    expect(screen.getByText("Project Alpha")).toBeInTheDocument();
  });

  it("renders the project location", () => {
    render(<ProjectCard item={item} onClick={() => {}} />);
    expect(screen.getByText("Berlin, Germany")).toBeInTheDocument();
  });

  it("renders the correct workers, total, and estimate values", () => {
    render(<ProjectCard item={item} onClick={() => {}} />);
    expect(screen.getByText("👥 10")).toBeInTheDocument();
    expect(screen.getByText("💰 $5000")).toBeInTheDocument();
    expect(screen.getByText("⏳ 120h")).toBeInTheDocument();
  });

  it("renders the comment button and calls onClick when clicked", () => {
    const onClickMock = vi.fn();
    render(<ProjectCard item={item} onClick={onClickMock} />);
    fireEvent.click(screen.getByText("💬"));
    expect(onClickMock).toHaveBeenCalled();
  });
});
