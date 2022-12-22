const baseUrl = 'http://localhost:3001/api/v1';

export const get = async (endpoint, token = null) => {
  const options = {
    method: 'GET',
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  };
  const response = await fetch(`${baseUrl}/${endpoint}`, options);
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }
  const data = await response.json();
  return data;
};

export const post = async (endpoint, body, token = null) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(body),
  };
  const response = await fetch(`${baseUrl}/${endpoint}`, options);
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }
  const data = await response.json();
  return data;
};

export const put = async (endpoint, body, token = null) => {
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(body),
  };
  const response = await fetch(`${baseUrl}/${endpoint}`, options);
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }
  return;
};

export const delete_request = async (endpoint, token = null) => {
  const options = {
    method: 'DELETE',
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  };
  const response = await fetch(`${baseUrl}/${endpoint}`, options);
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }
  return;
};
