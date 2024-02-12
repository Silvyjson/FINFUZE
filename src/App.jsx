import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./sass/main.scss";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import PageNotFound from "./pages/PageNotFound";

const elements = [
  { path: "/", element: <LandingPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignUpPage /> },
  { path: "*", element: <PageNotFound /> },
];
const router = createBrowserRouter(elements);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
