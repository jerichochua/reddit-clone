import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ErrorPage from './ErrorPage';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import LoginForm from './components/Login/LoginForm';
import SignupForm from './components/Signup/SignupForm';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/signup' element={<SignupForm />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
