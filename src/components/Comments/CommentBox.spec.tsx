import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CommentBox from "./CommentBox";

describe("CommentBox Component", () => {
  it("renders a textarea and buttons", () => {
    render(<CommentBox onAdd={() => {}} />);
    expect(screen.getByPlaceholderText("Add a comment...")).toBeInTheDocument();
    expect(screen.getByText("Add Comment")).toBeInTheDocument();
  });

  it("calls onAdd with the correct text when Add Comment button is clicked", () => {
    const onAddMock = vi.fn();
    render(<CommentBox onAdd={onAddMock} />);

    fireEvent.change(screen.getByRole("textbox"), { target: { value: "New comment" } });
    fireEvent.click(screen.getByRole("button"));

    expect(onAddMock).toHaveBeenCalledWith("New comment");
  });

  it("clears the textarea when Add Comment button is clicked", () => {
    render(<CommentBox onAdd={() => {}} />);

    fireEvent.change(screen.getByRole("textbox"), { target: { value: "New comment" } });
    fireEvent.click(screen.getByRole("button"));

    expect(screen.getByRole("textbox")).toHaveValue("");
  });

  it("disables Add Comment button when textarea is empty", () => {
    render(<CommentBox onAdd={() => {}} />);

    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("does not allow Add Comment button click when textarea is empty", () => {
    const onAddMock = vi.fn();
    render(<CommentBox onAdd={onAddMock} />);

    fireEvent.click(screen.getByRole("button"));
    expect(onAddMock).not.toHaveBeenCalled();
  });

  it("does not render Cancel button when cancel prop is not passed", () => {
    render(<CommentBox onAdd={() => {}} />);
    expect(screen.queryByText("Cancel")).not.toBeInTheDocument();
  });

  it("calls cancel function when Cancel button is clicked", () => {
    const cancelMock = vi.fn();
    render(<CommentBox onAdd={() => {}} cancel={cancelMock} />);

    fireEvent.click(screen.getByText("Cancel"));

    expect(cancelMock).toHaveBeenCalled();
  });
});
