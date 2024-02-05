import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import './sass/main.scss';
import LandingPage from './js-component/LandingPage';
import LoginComponent from './js-component/LoginPage';
import SignUpComponent from './js-component/SignUpPage';
import HomePage from './js-component/homePage';
import ResetPasswordComponent from './js-component/resetPassword';

const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/login-page", element: <LoginComponent /> },
  { path: "/reset-password", element: <ResetPasswordComponent /> },
  { path: "/signUp-page", element: <SignUpComponent /> },
  { path: "/home-page", element: <HomePage /> },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
