import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './../Pages/HomePage';
import NotFound from './../Pages/NotFound';
import SingleMovie from '../Pages/SingleMovie';
import Search from '../Pages/Search';
import MovieList from './../Pages/MovieList';

const routes = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
  },
  {
    path: "/movies",
    element: <MovieList />  
  },
  {
    path: "/m/:id",
    element: <SingleMovie />  
  },
  {
    path: "/m",
    element: <NotFound />  
  },
  {
    path: "/search",
    element: <Search />  
  },
  {
    path: "/404",
    element: <NotFound />
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
