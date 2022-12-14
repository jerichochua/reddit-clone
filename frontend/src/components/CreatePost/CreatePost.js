import React, { useEffect } from 'react';
import { post } from '../../util/api';
import { Form, FormField, FormTextArea, FormButton } from '../Form';
import { useAppContext } from '../../contexts/AppProvider';

const CreatePost = () => {
  const { state } = useAppContext();

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const body = {
      title: e.target.title.value,
      content: e.target.content.value,
    };
    try {
      const response = await post('posts', body, state.token);
      if (response) {
        window.location.href = `/posts/${response.id}`;
      } else {
        console.error(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!state.token) {
      window.location.href = '/login';
    }
  }, [state.token]);

  return (
    <Form wide onSubmit={onSubmitForm}>
      <FormField
        name='title'
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
