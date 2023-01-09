import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { Form, FormField, FormButton } from '../Form';
import Toast from '../Toast/Toast';
import { post } from '../../util/api';
import { useAppContext } from '../../contexts/AppProvider';
import { validateUsername, validatePassword } from '../../util/validators';

const LoginForm = () => {
  const { state, dispatch } = useAppContext();
  const [error, setError] = useState('');

  const onSubmitForm = async (e) => {
    e.preventDefault();

    const usernameErrors = validateUsername(e.target.username.value);
    const passwordErrors = validatePassword(e.target.password.value);

    if (usernameErrors.length > 0) {
      setError(usernameErrors[0]);
      return;
    }
    if (passwordErrors.length > 0) {
      setError(passwordErrors[0]);
      return;
    }

    const body = {
      username: e.target.username.value,
      password: e.target.password.value,
    };

    try {
      const response = await post('login', body);
      if (response.token) {
        localStorage.setItem('token', response.token);
        const { userId, username } = jwt_decode(response.token);
        setError('');
        dispatch({ type: 'SET_USER', payload: { userId, username } });
        dispatch({ type: 'SET_TOKEN', payload: response.token });
      } else {
        console.error(response);
      }
    } catch (error) {
      const errorObj = JSON.parse(error.message);
      if (errorObj.errors) {
        setError(errorObj.errors[0].message);
        return;
      }
      setError(error.message);
      return;
    }
  };

  useEffect(() => {
    if (state.token) {
      window.location.href = '/';
    }
  }, [state.token]);

  return (
    <>
      <Form onSubmit={onSubmitForm}>
        <FormField
          name='username'
          label='username'
          type='text'
          placeholder='username'
          required={true}
        />
        <FormField
          name='password'
          label='password'
          type='password'
          placeholder='password'
          required={true}
        />
        <FormButton label='log in' type='submit' />
      </Form>
      <Toast type='error' message={error} show={error} />
    </>
  );
};

export default LoginForm;
