import React from 'react';
import { Form, FormField, FormButton } from '../Form';

const LoginForm = () => {
  return (
    <Form>
      <FormField
        label='username'
        type='text'
        placeholder='username'
        required={true}
      />
      <FormField
        label='password'
        type='password'
        placeholder='password'
        required={true}
      />
      <FormButton label='log in' type='submit' />
    </Form>
  );
};

export default LoginForm;
