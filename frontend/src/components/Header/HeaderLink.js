import React from 'react';
import { Link } from 'react-router-dom';

const HeaderLink = ({ text, to }) => (
  <Link className='header-item header-link' to={to}>
    {text}
  </Link>
);

export default HeaderLink;
