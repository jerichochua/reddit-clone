import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Empty from '../../Empty/Empty';
import { get } from '../../../util/api';
import Posts from './Posts';
import './Content.css';

dayjs.extend(relativeTime);

const Content = ({ isUserPage }) => {
  const [posts, setPosts] = useState([]);
  const { username } = useParams();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (isUserPage) {
          const postsResponse = await get(`users/${username}`);
          setPosts(postsResponse);
        } else {
          const postsResponse = await get('posts');
          setPosts(postsResponse);
        }
      } catch (err) {
        setPosts([]);
      }
    };
    fetchPosts();
  }, [username, isUserPage]);

  const postsList = posts.map((post) => {
    return (
      <Posts
        key={post.id}
        postId={post.id}
        title={post.title}
        author={post.author}
        timestamp={dayjs(post.created_at).fromNow()}
        score={post.score}
        comments={parseInt(post.comments)}
      />
    );
  });

  return (
    <div className='content'>
      {posts.length === 0 ? (
        <Empty message='No posts to show' />
      ) : (
        <ul>{postsList}</ul>
      )}
    </div>
  );
};

export default Content;
