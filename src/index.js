import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import './sass/main.scss';
import LandingPage from './js-component/LandingPage';
import LoginComponent from './js-component/LoginPage';
import SignUpComponent from './js-component/SignUpPage';
import HomePage from './js-component/Home-page/HomePage';
import ResetPasswordComponent from './js-component/ResetPassword';
import ProfileSettings from './js-component/Home-page/ProfileSetting';
import AddBankInfoPage from './js-component/Home-page/BankDetails';
import GetBankInfoForm from './js-component/Bank-info/BankInfoForm';

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import EditBankInfoForm from './js-component/Bank-info/EditBankInfoForm';

library.add(fab, fas, far);

const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/login-page", element: <LoginComponent /> },
  { path: "/reset-password", element: <ResetPasswordComponent /> },
  { path: "/signUp-page", element: <SignUpComponent /> },
  { path: "/home-page", element: <HomePage /> },
  { path: "/profile-settings-page", element: <ProfileSettings/> },
  { path: "/addBankInfoPage-page", element: <AddBankInfoPage /> },
  { path: "/getBankInfoForm-page", element: <GetBankInfoForm /> },
  { path: "/editBankInfoForm-page", element: <EditBankInfoForm /> },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router} />
);

reportWebVitals();
