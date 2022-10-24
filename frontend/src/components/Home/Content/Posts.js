import React from 'react';
import Votes from './Votes';

export default function Posts(props) {
  return (
    <li>
      <div className='post-container'>
        <Votes votes={props.votes} />
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
