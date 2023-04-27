import React from 'react';
import { createHashRouter, Navigate, RouterProvider } from 'react-router-dom';
import MainLayout from './Components/MainLayout/MainLayout';
import Home from './Components/Home/Home';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Movies from './Components/Movies/Movies';
import TvShows from './Components/TvShows/TvShows';
// import Network from './Components/Network/Network';
import About from './Components/About/About';
import ErrorPage from './Components/ErrorPage/ErrorPage';
import { useState } from 'react';
import jwtDecode from 'jwt-decode';
import { useEffect } from 'react';
import MovieDetails from './Components/MovieDetails/MovieDetails';
import Profile from './Components/Profile/Profile';
import Search from './Components/Search/Search';
export default function App() {


  const [userData, setUserData] = useState(null);
  const saveUser = () => {
    let token = localStorage.getItem("token");
    let decoded = jwtDecode(token);
    setUserData(decoded);
    // console.log(decoded);
    // console.log('userData Saved');
  };


  useEffect(() => {
    if (localStorage.getItem("token")) {
      saveUser();
    }
  }, []);



  const ProtectedRoute = (props) => {
    if (localStorage.getItem("token")) {
      // console.log(props.children);
      return props.children;
    } else {
      return <Navigate to="/login" />;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUserData(null);
    return <Navigate to='/login' />;
  };

  const routers = createHashRouter([
    {
      path: '/', element: <MainLayout logout={logout} userData={userData} />, children: [
        { index: true, element: <ProtectedRoute> <Home /> </ProtectedRoute> },
        { path: 'register', element: <Register /> },
        { path: 'login', element: <Login saveUser={saveUser} /> },
        { path: 'movies', element: <ProtectedRoute> <Movies /> </ProtectedRoute> },
        { path: 'tvShows', element: <ProtectedRoute> <TvShows /> </ProtectedRoute> },
        { path: 'search', element: <ProtectedRoute> <Search /> </ProtectedRoute> },
        { path: 'profile', element: <ProtectedRoute> <Profile userData={userData} />  </ProtectedRoute> },
        // { path: 'network', element: <ProtectedRoute> <Network /></ProtectedRoute> },
        { path: 'about', element: <ProtectedRoute> <About /> </ProtectedRoute> },
        { path: 'details/:id/:type', element: <ProtectedRoute> <MovieDetails /> </ProtectedRoute> },

        { path: '*', element: <ErrorPage /> },
      ]
    }
  ]);
  return (
    <>
      <RouterProvider router={routers}></RouterProvider>
    </>
  );
};;
