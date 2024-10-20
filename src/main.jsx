import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';

// import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import PointsPage from './pages/PointsPage';
import ReferalPage from './pages/ReferalPage';
import SetCalcLink from './pages/CalcPage.jsx/SetCalcLink';
import SetCalcSize from './pages/CalcPage.jsx/SetCalcSize';
// import CalcPage from './pages/CalcPage.jsx/CalcPage';
import CalcDescription from './pages/CalcPage.jsx/CalcDescription';
import ProductPage from './pages/ProductPage/ProductPage';
import TableOfSizes from './pages/ProductPage/TableOfSizes';
import BottomBoard from './components/BottomBoard/BottomBoard';

import { ScrollToTop } from './utils/utilFuncs';
import { BackBtnHandle } from './utils/utilFuncs';
import './index.css'
import { theme } from './utils/theme';


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
          <Route path='/calcLink' element={<SetCalcLink />} />
          <Route path='/calcSize' element={<SetCalcSize />} />
          <Route path='/product' element={<ProductPage />} />
          <Route path='/sizes' element={<TableOfSizes />} />
        </Routes>
        <BottomBoard />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
