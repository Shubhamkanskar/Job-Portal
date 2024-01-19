import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import About from "../Pages/About";
import PostJob from "../Pages/PostJob";
import Myjobs from "../Pages/Myjobs";
import EstimateSalary from "../Pages/EstimateSalary";
import UpdateJob from "../Pages/UpdateJob";
import Login from "../Components/Login";
import JobDetails from "../Pages/JobDetails";
import SignUp from "../Components/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/post-job", element: <PostJob /> },
      { path: "/my-jobs", element: <Myjobs /> },
      { path: "/salary", element: <EstimateSalary /> },
      {
        path: "/edit-job/:id",
        element: <UpdateJob />,
        loader: async ({ params, state }) => {
          const response = await fetch(
            `http://localhost:3000/all-jobs/${params.id}`
          );
          const data = await response.json();
          return data;
        },
      },
      {
        path: "/job/:id",
        element: <JobDetails />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/Signup",
    element: <SignUp />,
  },
]);
export default router;
