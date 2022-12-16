import React from 'react';
import { Link } from 'react-router-dom';

const Username = ({ username }) => {
  return (
    <Link className='header-item header-link username' to={`/user/${username}`}>
      {username}
    </Link>
  );
};

export default Username;
