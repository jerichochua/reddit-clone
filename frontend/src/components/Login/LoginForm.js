import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { Error, Form, FormField, FormButton } from '../Form';
import { post } from '../../util/api';
import { useAppContext } from '../../contexts/AppProvider';

const LoginForm = () => {
  const { state, dispatch } = useAppContext();
  const [error, setError] = useState('');

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const body = {
      username: e.target.username.value,
      password: e.target.password.value,
    };

    try {
      const response = await post('login', body);
      console.log(response);
      if (response.token) {
        localStorage.setItem('token', response.token);
        const userId = jwt_decode(response.token).id;
        setError('');
        dispatch({ type: 'SET_USER', payload: userId });
        dispatch({ type: 'SET_TOKEN', payload: response.token });
      } else {
        console.error(response);
      }
    } catch (error) {
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
      {error && <Error message={error} />}
      <FormButton label='log in' type='submit' />
    </Form>
  );
};

export default LoginForm;
