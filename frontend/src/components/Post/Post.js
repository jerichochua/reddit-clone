import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { get, delete_request } from '../../util/api';
import { useAppContext } from '../../contexts/AppProvider';
import CommentForm from './CommentForm';
import CommentsList from './CommentsList';
import Empty from '../Empty/Empty';
import Toast from '../Toast/Toast';
import PostDetails from './PostDetails';
import './Post.css';

const Post = () => {
  const { state } = useAppContext();
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [error, setError] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deleteError, setDeleteError] = useState(false);
  const [editSuccess, setEditSuccess] = useState(false);
  const [editError, setEditError] = useState(false);
  const [message, setMessage] = useState('');

  const onDeletePost = async () => {
    try {
      await delete_request(`posts/${id}`, state.token);
      setDeleteError(false);
      setDeleteSuccess(true);
      setMessage('Post deleted successfully. Redirecting to home page...');
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    } catch (err) {
      setDeleteError(true);
      setDeleteSuccess(false);
      setMessage('Unable to delete post');
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await get(`posts/${id}`);
        setPost(response);
      } catch (err) {
        setError(true);
      }
    };
    fetchPost();
  }, [id]);

  return (
    <main className='post'>
      {error ? (
        <Empty message='Post not found' />
      ) : (
        <>
          <PostDetails post={post} onDelete={onDeletePost} />
          {state.token && <CommentForm postId={id} />}
          <CommentsList
            state={state}
            postId={id}
            setMessage={setMessage}
            setDeleteError={setDeleteError}
            setDeleteSuccess={setDeleteSuccess}
            setEditError={setEditError}
            setEditSuccess={setEditSuccess}
          />
          {deleteError && (
            <Toast type='error' message={message} show={deleteError} />
          )}
          {deleteSuccess && (
            <Toast type='info' message={message} show={deleteSuccess} />
          )}
          {editError && (
            <Toast type='error' message={message} show={editError} />
          )}
          {editSuccess && (
            <Toast type='info' message={message} show={editSuccess} />
          )}
        </>
      )}
    </main>
  );
};

export default Post;
