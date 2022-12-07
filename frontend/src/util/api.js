const baseUrl = 'http://localhost:3001/api/v1';

export const get = async (endpoint) => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const response = await fetch(`${baseUrl}/${endpoint}`, options);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
};
