import React, { createContext, useContext, useReducer } from 'react';
import jwt_decode from 'jwt-decode';

const AppContext = createContext();
AppContext.displayName = 'AppContext';

const token = localStorage.getItem('token');
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

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
