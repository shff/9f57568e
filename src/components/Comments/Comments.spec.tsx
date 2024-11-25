import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Comments from "./Comments";

import useIndexedDB from "../../hooks/useIndexedDB";
import useBroadcast from "../../hooks/useBroadcast";

vi.mock("../../hooks/useIndexedDB", () => ({
  __esModule: true,
  default: vi.fn(),
}));

vi.mock("../../hooks/useBroadcast", () => ({
  __esModule: true,
  default: vi.fn(),
}));

describe("Comments Component", () => {
  const mockReload = vi.fn();
  const mockAdd = vi.fn();
  const mockDestroy = vi.fn();

  beforeEach(() => {
    vi.mocked(useIndexedDB).mockReturnValue({
      data: [],
      reload: mockReload,
      add: mockAdd,
      destroy: mockDestroy,
    });

    vi.mocked(useBroadcast).mockReturnValue();
  });

  it("renders an empty comment box initially", () => {
    render(<Comments projectId={1} />);
    expect(screen.getByPlaceholderText("Add a comment...")).toBeInTheDocument();
  });

  it('adds a comment when text is entered and "Add Comment" is clicked', async () => {
    render(<Comments projectId={1} />);

    fireEvent.change(screen.getByRole("textbox"), { target: { value: "New comment" } });
    fireEvent.click(screen.getByRole("button"));

    expect(mockAdd).toHaveBeenCalledWith({
      id: expect.any(String),
      author: "Myself",
      text: "New comment",
      projectId: 1,
      parentId: undefined,
    });
  });

  it("renders comments and their replies", () => {
    vi.mocked(useIndexedDB).mockReturnValue({
      data: [
        { id: "1", author: "John", text: "Parent comment", projectId: 1 },
        { id: "2", author: "Jane", text: "Reply to comment", projectId: 1, parentId: "1" },
      ],
      reload: mockReload,
      add: mockAdd,
      destroy: mockDestroy,
    });

    render(<Comments projectId={1} />);
    expect(screen.getByText("Parent comment")).toBeInTheDocument();
    expect(screen.getByText("Reply to comment")).toBeInTheDocument();
  });

  it("allows adding replies to comments", async () => {
    vi.mocked(useIndexedDB).mockReturnValue({
      data: [{ id: "1", author: "John", text: "Parent comment", projectId: 1 }],
      reload: mockReload,
      add: mockAdd,
      destroy: mockDestroy,
    });

    render(<Comments projectId={1} />);
    fireEvent.click(screen.getByText("↩️"));

    fireEvent.change(screen.getAllByRole("textbox")[1], { target: { value: "Replying..." } });
    fireEvent.click(screen.getByText("Add Reply"));

    await waitFor(() =>
      expect(mockAdd).toHaveBeenCalledWith(
        expect.objectContaining({
          text: "Replying...",
          parentId: "1",
        })
      )
    );
  });

  it("deletes a comment when the delete button is clicked", () => {
    vi.mocked(useIndexedDB).mockReturnValue({
      data: [{ id: "1", author: "John", text: "Parent comment", projectId: 1 }],
      reload: mockReload,
      add: mockAdd,
      destroy: mockDestroy,
    });

    render(<Comments projectId={1} />);
    fireEvent.click(screen.getByText("🗑️"));

    expect(mockDestroy).toHaveBeenCalledWith("1");
  });

  it("deletes the replies of a comment when the delete button is clicked", () => {
    vi.mocked(useIndexedDB).mockReturnValue({
      data: [
        { id: "1", author: "John", text: "Parent comment", projectId: 1 },
        { id: "2", author: "Jane", text: "Reply to comment", projectId: 1, parentId: "1" },
      ],
      reload: mockReload,
      add: mockAdd,
      destroy: mockDestroy,
    });

    render(<Comments projectId={1} />);
    fireEvent.click(screen.getAllByText("🗑️")[0]);

    expect(mockDestroy).toHaveBeenCalledWith("1");
    expect(mockDestroy).toHaveBeenCalledWith("2");
  });
});
