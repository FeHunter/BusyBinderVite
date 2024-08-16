import { unstable_HistoryRouter as HistoryRouter, Route, Routes } from 'react-router-dom';
import { history } from './history';

import './App.css';
import { HomePage } from './pages/HomePage';
import PagesRoutes from './assets/PagesRoutes';
import { RegisterProduct } from './pages/RegisterProduct';
import { CartPage } from './pages/CartPage';
import { ProductPage } from './pages/ProductPage';

function App() {

  return (
    <HistoryRouter history={history}>
      <Routes>
        <Route path={PagesRoutes.HomePage} element={<HomePage />} />
        <Route path={PagesRoutes.RegisterProduct} element={<RegisterProduct/>} />
        <Route path={PagesRoutes.ProductPage} element={<ProductPage/>} />
        <Route path={PagesRoutes.Cart} element={<CartPage/>} />
      </Routes>
    </HistoryRouter>
  )
}

export default App;
