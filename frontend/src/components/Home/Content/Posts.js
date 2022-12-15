import React from 'react';
import { Link } from 'react-router-dom';
import Votes from '../../Vote/Votes';

export default function Posts(props) {
  return (
    <li>
      <div className='post-container'>
        <Votes votes={props.votes} />
        <div className='post-item'>
          <div className='title'>
            <Link to={`/posts/${props.postid}`}>
              {props.title}
            </Link>
          </div>
          <div className='caption'>
            <span>by </span>
            <Link to={`/user/${props.author}`}>{props.author}</Link>
            <span> {props.timestamp}</span>
          </div>
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
