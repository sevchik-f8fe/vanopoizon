import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ThemeProvider } from '@mui/material';

import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import './index.css'
import { theme } from './utils/theme';

const router = createBrowserRouter([
  {
    path: "/vanopoizon/",
    element: <ProfilePage />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
)
