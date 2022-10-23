import React from 'react';

export default function Post(props) {
  return (
    <li>
      <div className='post-container'>
        <div className='votes'>
          <button className='upvote-btn'></button>
          <span>{props.votes}</span>
          <button className='downvote-btn'></button>
        </div>
        <div className='post-item'>
          <p className='title'>{props.title}</p>
          <p className='caption'>
            by {props.author} {props.timestamp}
          </p>
          <p className='links'>{props.comments} comments</p>
        </div>
      </div>
    </li>
  );
}
