import React from 'react';
import { Link } from 'react-router-dom';

const Username = ({ username }) => {
  return (
    <div className='header-item username'>
      <Link className='header-link' to={`/user/${username}`}>
        {username}
      </Link>
    </div>
  );
};

export default Username;
