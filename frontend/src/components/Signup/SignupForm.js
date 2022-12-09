import React from 'react';
import { Form, FormField, FormButton } from '../Form';

const SignupForm = () => {
  return (
    <Form>
      <FormField label='username' type='text' placeholder='username' />
      <FormField label='password' type='password' placeholder='password' />
      <FormField
        label='confirm password'
        type='password'
        placeholder='confirm password'
      />
      <FormButton label='sign up' type='submit' />
    </Form>
  );
};

export default SignupForm;
