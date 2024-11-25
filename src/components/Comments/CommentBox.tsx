import { useState, useCallback } from "react";

interface CommentBoxProps {
  isReply?: boolean;
  onAdd: (text: string) => void;
  cancel?: () => void;
}

/**
 * This component is used to add a new top-level comment or a reply.
 * @param {object} props - Component props.
 * @param {boolean} [props.isReply] If true, the comment box is for a reply.
 * @param {function} [props.onAdd] Callback function to add a new comment or reply.
 * @param {function} [props.cancel] Callback function to cancel adding a reply.
 */
const CommentBox = ({ isReply = false, onAdd, cancel }: CommentBoxProps) => {
  const [text, setText] = useState("");

  const handleAdd = useCallback(() => {
    onAdd(text);
    setText("");
  }, [text, onAdd]);

  return (
    <div className="mt-2 w-full space-y-2">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={isReply ? "Add a reply..." : "Add a comment..."}
        className="w-full rounded border border-gray-300 p-2 text-black"
      />
      <button
        onClick={handleAdd}
        className={`mt-2 rounded bg-blue-500 px-4 py-2 text-white ${!text && "cursor-not-allowed opacity-50"}`}
        disabled={!text.trim()}
      >
        {isReply ? "Add Reply" : "Add Comment"}
      </button>
      {cancel && (
        <button onClick={cancel} className="m-2 rounded bg-red-500 px-4 py-2 text-white">
          Cancel
        </button>
      )}
    </div>
  );
};

export default CommentBox;
