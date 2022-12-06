import React from 'react';
import DarkModeButton from './DarkModeButton';
import HeaderLink from './HeaderLink';
import Logo from './Logo';
import './Header.css';

export default function Header(props) {
  return (
    <div className='header'>
      <Logo />
      <HeaderLink text='log in' to='login' />
      <HeaderLink text='sign up' to='signup' />
    </div>
  );
}
