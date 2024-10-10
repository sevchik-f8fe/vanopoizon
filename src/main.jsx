import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';

import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import PointsPage from './pages/PointsPage';
import './index.css'
import { theme } from './utils/theme';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter basename={'/vanopoizon'}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/points' element={<PointsPage />} />
          {/* <Route path='/' element={<PointsPage />} /> */}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
