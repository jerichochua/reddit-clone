import React, { useEffect } from 'react';
import { Form, FormField, FormTextArea, FormButton } from '../Form';
import { useAppContext } from '../../contexts/AppProvider';

const CreatePost = () => {
  const { state } = useAppContext();

  useEffect(() => {
    if (!state.user) {
      window.location.href = '/login';
    }
  }, [state.user]);

  return (
    <Form wide>
      <FormField
        label='title'
        type='text'
        placeholder='title'
        required={true}
      />
      <FormTextArea
        name='content'
        label='content'
        placeholder='content'
        required={true}
      />
      <FormButton label='create post' type='submit' />
    </Form>
  );
};

export default CreatePost;
