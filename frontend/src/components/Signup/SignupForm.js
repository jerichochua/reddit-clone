import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { Error, Form, FormField, FormButton } from '../Form';
import { post } from '../../util/api';
import { useAppContext } from '../../contexts/AppProvider';
import { validateUsername, validatePassword } from '../../util/validators';

const SignupForm = () => {
  const { state, dispatch } = useAppContext();
  const [usernameErrors, setUsernameErrors] = useState([]);
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [error, setError] = useState('');

  const usernameErrorComponents = usernameErrors.map((error, index) => (
    <Error key={index} message={error} />
  ));

  const passwordErrorComponents = passwordErrors.map((error, index) => (
    <Error key={index} message={error} />
  ));

  const onSubmitForm = async (e) => {
    e.preventDefault();

    setUsernameErrors([]);
    setPasswordErrors([]);
    const usernameErrors = validateUsername(e.target.username.value);
    const passwordErrors = validatePassword(e.target.password.value);
    if (usernameErrors.length > 0) {
      setUsernameErrors(usernameErrors);
      return;
    }
    if (passwordErrors.length > 0) {
      setPasswordErrors(passwordErrors);
      return;
    }
    if (e.target.password.value !== e.target.confirmPassword.value) {
      setPasswordErrors(['Passwords do not match']);
      return;
    }

    const body = {
      username: e.target.username.value,
      password: e.target.password.value,
    };

    try {
      const response = await post('register', body);
      if (response.token) {
        localStorage.setItem('token', response.token);
        const { userId, username } = jwt_decode(response.token);
        dispatch({ type: 'SET_USER', payload: { userId, username } });
        dispatch({ type: 'SET_TOKEN', payload: response.token });
        window.location.href = '/';
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
    <Form onSubmit={onSubmitForm}>
      <FormField
        name='username'
        label='username'
        type='text'
        placeholder='username'
        required={true}
      />
      {usernameErrorComponents}
      <FormField
        name='password'
        label='password'
        type='password'
        placeholder='password'
        required={true}
      />
      <FormField
        name='confirmPassword'
        label='confirm password'
        type='password'
        placeholder='confirm password'
        required={true}
      />
      {passwordErrorComponents}
      {error && <Error message={error} />}
      <FormButton label='sign up' type='submit' />
    </Form>
  );
};

export default SignupForm;
