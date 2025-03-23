import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/login/login.page';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import ChooseUserPage from './pages/choose-user/choose-user.page';
import ProductsPage from './pages/products/products.page';
import 'primeicons/primeicons.css';
import MultipleProductUploadPage from './pages/multiple-product-upload/multipleProductUpload.page';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="*" element={<LoginPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/chooseUser" element={<ChooseUserPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/uploadProducts" element={<MultipleProductUploadPage />} />


      </Routes>
    </Router>
  );
}

export default App;
