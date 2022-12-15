import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { get } from '../../util/api';
import { useAppContext } from '../../contexts/AppProvider';
import CommentForm from './CommentForm';
import CommentsList from './CommentsList';
import Empty from '../Empty/Empty';
import PostDetails from './PostDetails';
import './Post.css';

const Post = () => {
  const { state } = useAppContext();
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await get(`posts/${id}`);
        setPost(response);
      } catch (error) {
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
          <PostDetails post={post} />
          {state.token && <CommentForm postId={id} />}
          <CommentsList postId={id} />
        </>
      )}
    </main>
  );
};

export default Post;
