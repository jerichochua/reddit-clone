import React, { useEffect, useState } from 'react';
import { post } from '../../util/api';
import {
  Error,
  Form,
  FormButton,
  FormField,
  FormOption,
  FormTextArea,
} from '../Form';
import { useAppContext } from '../../contexts/AppProvider';
import {
  validateContent,
  validateTitle,
  validateUrl,
} from '../../util/validators';

const CreatePost = () => {
  const { state } = useAppContext();
  const [titleErrors, setTitleErrors] = useState([]);
  const [contentErrors, setContentErrors] = useState([]);
  const [urlErrors, setUrlErrors] = useState([]);
  const [currentPostType, setCurrentPostType] = useState('text');

  const titleErrorComponents = titleErrors.map((error, index) => (
    <Error key={index} message={error} />
  ));

  const contentErrorComponents = contentErrors.map((error, index) => (
    <Error key={index} message={error} />
  ));

  const urlErrorComponents = urlErrors.map((error, index) => (
    <Error key={index} message={error} />
  ));

  const onSubmitForm = async (e) => {
    e.preventDefault();

    setTitleErrors([]);
    setContentErrors([]);
    setUrlErrors([]);

    let body = {};
    const titleErrors = validateTitle(e.target.title.value);
    if (titleErrors.length > 0) {
      setTitleErrors(titleErrors);
      return;
    }

    if (currentPostType === 'link') {
      const urlErrors = validateUrl(e.target.url.value);
      if (urlErrors.length > 0) {
        setUrlErrors(urlErrors);
        return;
      }
      body = {
        title: e.target.title.value,
        type: 'link',
        url: e.target.url.value,
      };
    } else {
      const contentErrors = validateContent(e.target.content.value);
      if (contentErrors.length > 0) {
        setContentErrors(contentErrors);
        return;
      }
      body = {
        title: e.target.title.value,
        type: 'text',
        content: e.target.content.value,
      };
    }

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
      <FormOption
        name='posttype'
        label='type'
        options={[
          { value: 'text', label: 'text' },
          { value: 'link', label: 'link' },
        ]}
        setOption={setCurrentPostType}
      />
      <FormField
        name='title'
        label='title'
        type='text'
        placeholder='title'
        required={true}
      />
      {titleErrorComponents}
      {currentPostType === 'link' && (
        <>
          <FormField
            name='url'
            label='url'
            type='text'
            placeholder='url'
            required={true}
          />
          {urlErrorComponents}
        </>
      )}
      {currentPostType === 'text' && (
        <>
          <FormTextArea
            name='content'
            label='content'
            placeholder='content'
            required={true}
          />
          {contentErrorComponents}
        </>
      )}
      <FormButton label='create post' type='submit' />
    </Form>
  );
};

export default CreatePost;
