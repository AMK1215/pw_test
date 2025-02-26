import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { paths } from "../config/path"
import { lazy } from "react";
 import Layout from "../components/organisms/Layout";

const HomePage = lazy(() => import("../pages/HomePage"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const PlayPage = lazy(() => import("../pages/PlayPage"));

export const createAppRouter = ()=>{
    return createBrowserRouter ([
      {
        element: <Layout />, 
        children: [
          {
            path: paths.home.path,
            element: <HomePage />,
          },
          {
            path: paths.play.path,
            element: <PlayPage />,
          },
          {
            path: paths.auth.login.path,
            element: <LoginPage />,
          },
        ],
      },
    ])
}

export const AppRouter = () => {
   
    const router =  createAppRouter();
  
    return <RouterProvider router={router} />;
  };