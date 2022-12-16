import React, { useEffect, useState } from 'react';
import { get, delete_request } from '../../util/api';
import Comment from './Comment';
import './Comments.css';

const CommentsList = ({
  state,
  postId,
  setMessage,
  setDeleteError,
  setDeleteSuccess,
}) => {
  const [comments, setComments] = useState([]);

  const onDeleteComment = async (e) => {
    const commentId = e.target.value;
    try {
      await delete_request(
        `posts/${postId}/comments/${commentId}`,
        state.token
      );
      setDeleteError(false);
      setDeleteSuccess(true);
      setMessage('Comment deleted successfully. Reloading comments...');
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      setDeleteError(true);
      setDeleteSuccess(false);
      setMessage('Unable to delete comment');
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      const response = await get(`posts/${postId}/comments`);
      setComments(response);
    };
    fetchComments();
  }, [postId]);

  const commentsList = comments.map((comment) => (
    <Comment
      key={comment.id}
      comment={comment}
      username={state.username}
      onDelete={onDeleteComment}
    />
  ));

  return <ul className='comments-list'>{commentsList}</ul>;
};

export default CommentsList;
