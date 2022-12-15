import React, { useEffect, useState } from 'react';
import { post } from '../../util/api';
import { Error, Form, FormField, FormTextArea, FormButton } from '../Form';
import { useAppContext } from '../../contexts/AppProvider';
import { validateTitle, validateContent } from '../../util/validators';

const CreatePost = () => {
  const { state } = useAppContext();
  const [titleErrors, setTitleErrors] = useState([]);
  const [contentErrors, setContentErrors] = useState([]);

  const titleErrorComponents = titleErrors.map((error, index) => (
    <Error key={index} message={error} />
  ));

  const contentErrorComponents = contentErrors.map((error, index) => (
    <Error key={index} message={error} />
  ));

  const onSubmitForm = async (e) => {
    e.preventDefault();

    setTitleErrors([]);
    setContentErrors([]);
    const titleErrors = validateTitle(e.target.title.value);
    const contentErrors = validateContent(e.target.content.value);
    if (titleErrors.length > 0) {
      setTitleErrors(titleErrors);
      return;
    }
    if (contentErrors.length > 0) {
      setContentErrors(contentErrors);
      return;
    }

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
      {titleErrorComponents}
      <FormTextArea
        name='content'
        label='content'
        placeholder='content'
        required={true}
      />
      {contentErrorComponents}
      <FormButton label='create post' type='submit' />
    </Form>
  );
};

export default CreatePost;
