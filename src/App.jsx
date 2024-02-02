import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./sass/main.scss";
import LandingPage from "./js-component/LandingPage";
import LoginComponent from "./js-component/LoginPage";
import SignUpComponent from "./js-component/SignUpPage";
import PageNotFound from "./pages/PageNotFound";

const elements = [
  { path: "/", element: <LandingPage /> },
  { path: "/login", element: <LoginComponent /> },
  { path: "/signup", element: <SignUpComponent /> },
  { path: "*", element: <PageNotFound /> },
];
const router = createBrowserRouter(elements);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
