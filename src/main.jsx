import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';

import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import PointsPage from './pages/PointsPage';
import ReferalPage from './pages/ReferalPage';
import CalcPage from './pages/CalcPage.jsx/CalcPage';
import ProductPage from './pages/ProductPage/ProductPage';
import TableOfSizes from './pages/ProductPage/TableOfSizes';
import BuyProductPage from './pages/ProductPage/BuyProductPage';
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
          <Route path='/referal' element={<ReferalPage />} />
          <Route path='/calc' element={<CalcPage />} />
          <Route path='/product' element={<ProductPage />} />
          <Route path='/product/sizes' element={<TableOfSizes />} />
          <Route path='/product/buy' element={<BuyProductPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
