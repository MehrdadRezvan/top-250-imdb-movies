import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './../Pages/HomePage';
import NotFound from './../Pages/NotFound';
import SingleMovie from '../Pages/SingleMovie';
import GenreList from '../Pages/GenreList';

const routes = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
  },
  {
    path: "/m/:id",
    element: <SingleMovie />  
  },
  {
    path: "/g/:id",
    element: <GenreList />
  },
  {
    path: "/g/",
    element: <GenreList />
  },
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
