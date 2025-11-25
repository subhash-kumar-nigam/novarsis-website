import { Routes, Route } from 'react-router-dom';
import ProductList from './pages/ProductList';
import ProductDetails from './pages/ProductDetails';
import AddProduct from './pages/AddProduct';

function ProductRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="add" element={<AddProduct />} />
      <Route path=":productId" element={<ProductDetails />} />
    </Routes>
  );
}

export default ProductRoutes;
