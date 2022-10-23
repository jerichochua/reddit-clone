import React from 'react';
import DarkModeButton from './DarkModeButton';
import HeaderLink from './HeaderLink';
import Logo from './Logo';
import './Header.css';

export default function Header(props) {
  return (
    <div className='header'>
      <Logo />
      <DarkModeButton />
      <HeaderLink text='log in' />
      <HeaderLink text='sign up' />
    </div>
  );
}
