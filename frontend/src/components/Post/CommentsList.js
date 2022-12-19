import React, { useEffect, useState } from 'react';
import { get, put, delete_request } from '../../util/api';
import Comment from './Comment';
import './Comments.css';

const CommentsList = ({
  state,
  postId,
  setMessage,
  setDeleteError,
  setDeleteSuccess,
  setEditError,
  setEditSuccess,
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

  const onEditComment = async (e) => {
    e.preventDefault();
    const commentId = e.target.commenteditbtn.value;
    const comment = e.target.commentedit.value;
    try {
      await put(
        `posts/${postId}/comments/${commentId}`,
        { content: comment },
        state.token
      );
      setEditError(false);
      setEditSuccess(true);
      setMessage('Comment edited successfully. Reloading comments...');
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      setEditError(true);
      setEditSuccess(false);
      setMessage('Unable to edit comment');
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
      onEdit={onEditComment}
    />
  ));

  return <ul className='comments-list'>{commentsList}</ul>;
};

export default CommentsList;
