import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import {
//   createBrowserRouter,
//   RouterProvider,
// } from "react-router-dom";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';

import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import './index.css'
import { theme } from './utils/theme';

// const router = createBrowserRouter([
//   {
//     path: "/vanopoizon/",
//     element: <HomePage />,
//     errorElement: <ErrorPage />
//   },
//   {
//     path: "/vanopoizon/profile/",
//     element: <ProfilePage />
//   }
// ]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter basename={'/vanopoizon'}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/profile' element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
      {/* <RouterProvider router={router} /> */}
    </ThemeProvider>
  </StrictMode>,
)
