import React, { createContext, useContext, useReducer } from 'react';
import jwt_decode from 'jwt-decode';

const AppContext = createContext();
AppContext.displayName = 'AppContext';

let token = localStorage.getItem('token');

if (token) {
  const decoded = jwt_decode(token);
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    localStorage.removeItem('token');
    token = null;
  }
}

const userId = token ? jwt_decode(token).id : null;
const username = token ? jwt_decode(token).username : null;

const initialState = {
  userId,
  username,
  token,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        userId: action.payload.userId,
        username: action.payload.username,
      };
    case 'SET_TOKEN':
      return { ...state, token: action.payload };
    case 'LOGOUT':
      return { ...state, userId: null, username: null, token: null };
    default:
      return state;
  }
};

export const AppProvider = ({ children, value = initialState }) => {
  const [state, dispatch] = useReducer(reducer, value);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
