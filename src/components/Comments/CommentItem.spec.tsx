import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CommentItem from "./CommentItem";
import { Comment } from "./types";

const mockComment: Comment = {
  id: "1",
  author: "John Doe",
  text: "This is a comment.",
  projectId: 1,
};

const mockReplies: Comment[] = [
  { id: "2", author: "Jane Smith", text: "This is a reply.", projectId: 1 },
  { id: "3", author: "Alice Johnson", text: "Another reply here.", projectId: 1 },
];

describe("CommentItem Component", () => {
  it("renders a comment with author and text", () => {
    render(<CommentItem comment={mockComment} destroy={() => {}} />);
    expect(screen.getByText(/by John Doe at/)).toBeInTheDocument();
    expect(screen.getByText("This is a comment.")).toBeInTheDocument();
  });

  it("renders replies if provided", () => {
    render(<CommentItem comment={mockComment} replies={mockReplies} destroy={() => {}} />);
    expect(screen.getByText(/by Jane Smith at/)).toBeInTheDocument();
    expect(screen.getByText("This is a reply.")).toBeInTheDocument();
    expect(screen.getByText("Another reply here.")).toBeInTheDocument();
  });

  it("calls the destroy function when the delete button is clicked", () => {
    const destroyMock = vi.fn();
    render(<CommentItem comment={mockComment} destroy={destroyMock} />);

    fireEvent.click(screen.getByText("🗑️"));
    expect(destroyMock).toHaveBeenCalledWith("1");
  });

  it("calls the reply function when the reply button is clicked", () => {
    const replyMock = vi.fn();
    render(<CommentItem comment={mockComment} reply={replyMock} destroy={() => {}} />);

    fireEvent.click(screen.getByText("↩️"));
    expect(replyMock).toHaveBeenCalled();
  });

  it("calls destroy for replies when delete button is clicked", () => {
    const destroyMock = vi.fn();
    render(<CommentItem comment={mockComment} replies={mockReplies} destroy={destroyMock} />);

    const deleteReplyButtons = screen.getAllByText("🗑️");
    fireEvent.click(deleteReplyButtons[1]); // Deletes the first reply
    fireEvent.click(deleteReplyButtons[2]); // Deletes the second reply

    expect(destroyMock).toHaveBeenCalledWith("2");
    expect(destroyMock).toHaveBeenCalledWith("3");
  });

  it("renders extra content if provided as children", () => {
    render(
      <CommentItem comment={mockComment} destroy={() => {}}>
        <div>Extra Content</div>
      </CommentItem>
    );
    expect(screen.getByText("Extra Content")).toBeInTheDocument();
  });
});
