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
import SetCalcSize from './pages/CalcPage/SetCalcSize';
import CalcDescription from './pages/CalcPage/CalcDescription';
import ProductPage from './pages/ProductPage/ProductPage';
import TableOfSizes from './pages/ProductPage/TableOfSizes';
import CartPage from './pages/CartPage/CartPage';
import DeliveryDataPage from './pages/DeliveryDataPage/DeliveryDataPage';
import ContestPage from './pages/ContestPage/ContestPage';
import FilterPage from './pages/FilterPage/FilterPage';

import { ScrollToTop } from './utils/utilFuncs';
import { BackBtnHandle } from './utils/utilFuncs';
import './index.css'
import { theme } from './utils/theme';
import SelectPage from './pages/SelectPage/SelectPage';
import NewsPage from './pages/NewsPage/NewsPage';
import FavoritePage from './pages/FavoritePage/FavotitePage';
import GeoSelectPage from './pages/GeoSelectPage/GeoSelectPage';

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
          <Route path='/calc' element={<CalcDescription />} />
          <Route path='/deliveryData' element={<DeliveryDataPage />} />
          <Route path='/calcLink' element={<SetCalcLink />} />
          <Route path='/calcSize' element={<SetCalcSize />} />
          <Route path='/product' element={<ProductPage />} />
          <Route path='/sizes' element={<TableOfSizes />} />
          <Route path='/select' element={<SelectPage />} />
          <Route path='/geoSelect' element={<GeoSelectPage />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/favorite' element={<FavoritePage />} />
          <Route path='/contest' element={<ContestPage />} />
          <Route path='/filter' element={<FilterPage />} />
          <Route path='/news' element={<NewsPage />} />
        </Routes>
        {/* <BottomBoard /> */}
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
)