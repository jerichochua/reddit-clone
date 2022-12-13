import React from 'react';
import HeaderLink from './HeaderLink';
import Logo from './Logo';
import Username from './Username';
import { useAppContext } from '../../contexts/AppProvider';
import './Header.css';

const Header = () => {
  const { state, dispatch } = useAppContext();
  const user = state.user;

  const logout = () => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <div className='header'>
      <Logo />
      {user ? (
        <>
          <Username username={user} />
          <HeaderLink text='create post' to='createpost' />
          <span className='header-item header-link' onClick={logout}>
            logout
          </span>
        </>
      ) : (
        <>
          <HeaderLink text='log in' to='login' />
          <HeaderLink text='sign up' to='signup' />
        </>
      )}
    </div>
  );
};

export default Header;
