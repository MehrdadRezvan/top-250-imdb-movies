import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './../Pages/HomePage';
import NotFound from './../Pages/NotFound';

const routes = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
  },
  // {
  //   path: "",
  //   element: ""  
  // },
  {
    path: "*",
    element: <NotFound />
  }
])

export default function Router() {
  return (
    <RouterProvider router={routes} />
  )
}
