import { unstable_HistoryRouter as HistoryRouter, Route, Routes } from 'react-router-dom';
import { history } from './history';

import './App.css';
import { HomePage } from './pages/HomePage';
import PagesRoutes from './assets/PagesRoutes';
import { AdmPage } from './pages/Adm/AdmPage';
import { CartPage } from './pages/CartPage';
import { ProductPage } from './pages/ProductPage';
import { ProductsList } from './pages/ProductsList';
import { AboutMe } from './pages/AboutMe';
import { ContactsPage } from './pages/ContactsPage';
import { RegisterProductPage } from './pages/Adm/RegisterProductPage';


function App() {

  return (
    <HistoryRouter history={history}>
      <Routes>
        <Route path={PagesRoutes.HomePage} element={<HomePage />} />
        <Route path={"/ProductPage/:id"} element={<ProductPage/>} />
        <Route path={PagesRoutes.Cart} element={<CartPage/>} />
        <Route path={PagesRoutes.ProductsList} element={<ProductsList/>} />
        <Route path={PagesRoutes.AboutMe} element={<AboutMe/>} />
        <Route path={PagesRoutes.Contacts} element={<ContactsPage/>} />
        {/* ADM PAGES */}
        <Route path={PagesRoutes.AdmPage} element={<AdmPage/>} />
        <Route path={PagesRoutes.RegisterProduct} element={<RegisterProductPage/>} />
      </Routes>
    </HistoryRouter>
  )
}

export default App;
