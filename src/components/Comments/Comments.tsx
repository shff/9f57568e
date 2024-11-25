import { useState } from "react";
import useIndexedDB from "../../hooks/useIndexedDB";
import useBroadcast from "../../hooks/useBroadcast";
import CommentBox from "./CommentBox";
import CommentItem from "./CommentItem";

import { Comment } from "./types";

/**
 * This component is used to display comments for a project. It provides its own
 * comment box and displays comments and their replies. It uses IndexedDB to store
 * comments and broadcasts changes to other tabs with the same project open.
 *
 * At the moment it does not support syncing to a server, so comments are only
 * stored locally. This could be extended to use a server API.
 *
 * @param {object} props - Component props.
 * @param {number} props.projectId - The ID of the project to display comments for.
 */
const Comments = ({ projectId }: { projectId: number }) => {
  const [replyingId, setReplyingId] = useState<string | null>(null);
  const { data, reload, add, destroy } = useIndexedDB<Comment>("DB1", "Comments");
  useBroadcast(`comments_${projectId}`, () => reload(), [data.length]);

  const getChildren = (id: string) => data.filter((item) => item.parentId === id);
  const comments = data.filter((item) => item.projectId === projectId && !item.parentId);

  const handleAdd = async (text: string, parentId?: string) => {
    await add({
      id: Date.now().toString(),
      author: "Myself",
      text,
      projectId,
      parentId,
    });
    setReplyingId(null);
  };
  const handleDestroy = (id: string) => {
    getChildren(id).forEach((item) => destroy(item.id));
    destroy(id);
    setReplyingId(null);
  };

  return (
    <div className="space-y-4">
      <CommentBox onAdd={handleAdd} />

      {comments.map((comment: Comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          replies={getChildren(comment.id)}
          destroy={handleDestroy}
          reply={() => setReplyingId(comment.id)}
        >
          {replyingId === comment.id && (
            <CommentBox isReply onAdd={(text) => handleAdd(text, comment.id)} cancel={() => setReplyingId(null)} />
          )}
        </CommentItem>
      ))}
    </div>
  );
};

export default Comments;
