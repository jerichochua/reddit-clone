import React from 'react';
import { Link } from 'react-router-dom';
import Votes from './Votes';

export default function Posts(props) {
  return (
    <li>
      <div className='post-container'>
        <Votes votes={props.votes} />
        <div className='post-item'>
          <div>
            <Link className='title' to={`/posts/${props.postid}`}>
              {props.title}
            </Link>
          </div>
          <p className='caption'>
            by {props.author} {props.timestamp}
          </p>
          <div>
            <Link className='links' to={`/posts/${props.postid}`}>
              {props.comments} comment{props.comments === 1 ? '' : 's'}
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
}
