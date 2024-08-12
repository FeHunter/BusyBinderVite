import { unstable_HistoryRouter as HistoryRouter, Route, Routes } from 'react-router-dom';
import { history } from './history';

import './App.css';
import { HomePage } from './pages/HomePage';
import PagesRoutes from './assets/PagesRoutes';
import { RegisterProduct } from './pages/RegisterProduct';

function App() {

  return (
    <HistoryRouter history={history}>
      <Routes>
        <Route path={PagesRoutes.HomePage} element={<HomePage />} />
        <Route path={PagesRoutes.RegisterProduct} element={<RegisterProduct/>} />
      </Routes>
    </HistoryRouter>
  )
}

export default App;
