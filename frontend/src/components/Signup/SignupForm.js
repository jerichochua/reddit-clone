import React from 'react';
import { Form, FormField, FormButton } from '../Form';

const SignupForm = () => {
  return (
    <Form>
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
      <FormField
        label='confirm password'
        type='password'
        placeholder='confirm password'
        required={true}
      />
      <FormButton label='sign up' type='submit' />
    </Form>
  );
};

export default SignupForm;
