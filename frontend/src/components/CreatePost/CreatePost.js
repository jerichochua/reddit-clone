import React from 'react';
import { Form, FormField, FormTextArea, FormButton } from '../Form';

const CreatePost = () => {
  return (
    <Form wide>
      <FormField label='title' type='text' placeholder='title' />
      <FormTextArea label='content' placeholder='content' />
      <FormButton label='create post' type='submit' />
    </Form>
  );
};

export default CreatePost;
