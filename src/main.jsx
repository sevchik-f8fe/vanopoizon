import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';

// import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import PointsPage from './pages/PointsPage';
import ReferalPage from './pages/ReferalPage';
import SetCalcLink from './pages/CalcPage/SetCalcLink';
import ProductPage from './pages/ProductPage/ProductPage';
import TableOfSizes from './pages/ProductPage/TableOfSizes';
import CartPage from './pages/CartPage/CartPage';
import DeliveryDataPage from './pages/DeliveryDataPage/DeliveryDataPage';
import ContestPage from './pages/ContestPage/ContestPage';

import { ScrollToTop } from './utils/utilFuncs';
import { BackBtnHandle } from './utils/utilFuncs';
import './index.css'
import { theme } from './utils/theme';
import SelectPage from './pages/SelectPage/SelectPage';
import NewsPage from './pages/NewsPage/NewsPage';
import FavoritePage from './pages/FavoritePage/FavotitePage';
import GeoSelectPage from './pages/GeoSelectPage/GeoSelectPage';
import OrdersPage from './pages/OrdersPage/OrdersPage';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter basename={'/vanopoizon'}>
        <ScrollToTop />
        <BackBtnHandle />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/points' element={<PointsPage />} />
          <Route path='/referal' element={<ReferalPage />} />
          <Route path='/deliveryData' element={<DeliveryDataPage />} />
          <Route path='/calc' element={<SetCalcLink />} />
          <Route path='/product' element={<ProductPage />} />
          <Route path='/sizes' element={<TableOfSizes />} />
          <Route path='/select' element={<SelectPage />} />
          <Route path='/geoSelect' element={<GeoSelectPage />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/favorite' element={<FavoritePage />} />
          <Route path='/contest' element={<ContestPage />} />
          <Route path='/news' element={<NewsPage />} />
          <Route path='/orders' element={<OrdersPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
)
