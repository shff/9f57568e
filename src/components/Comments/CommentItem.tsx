import { Comment } from "./types";

interface CommentItemProps {
  comment: Comment;
  replies?: Comment[];
  reply?: () => void;
  destroy: (id: string) => void;
  children?: React.ReactNode;
}

/**
 * This component represents a single comment with its replies. It also provides
 * reply and delete buttons for the comment and each reply.
 *
 * @param props The props of the component
 * @param {object} [props.comment] The object representing the comment
 * @param {array} [props.replies] The array of replies to the comment
 * @param {function} [props.reply] This callback is called when the user clicks the reply button
 * @param {function} [props.destroy] The callback is called when the user clicks the delete button
 * @param {object} [props.children] Free area, when there's interest in drawing extra content inside the comment
 */
const CommentItem = ({ comment, replies, reply, destroy, children }: CommentItemProps) => (
  <div key={comment.id} className="rounded-lg border border-gray-600 p-4">
    <div className="flex justify-between">
      <div>
        <h3 className="mb-2 text-xs">
          by {comment.author} at <time>{new Date(parseInt(comment.id)).toLocaleString()}</time>
        </h3>
        <p>{comment.text}</p>
      </div>
      <span>
        {reply && (
          <button onClick={reply} className="text-blue-500">
            ↩️
          </button>
        )}
        &nbsp;
        <button onClick={() => destroy(comment.id)} className="text-red-500">
          🗑️
        </button>
      </span>
    </div>

    {replies?.map((reply: Comment) => (
      <div key={reply.id} className="mt-4 flex justify-between pl-4">
        <div>
          <h3 className="mb-2 text-xs">
            by {reply.author} at {new Date(parseInt(reply.id)).toLocaleString()}
          </h3>
          <p>{reply.text}</p>
        </div>
        <button onClick={() => destroy(reply.id)} className="text-red-500">
          🗑️
        </button>
      </div>
    ))}

    {children}
  </div>
);

export default CommentItem;
