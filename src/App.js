import './App.css';
import { useState, useEffect } from 'react';
import { commerce } from './lib/commerce';
import {Route, Routes } from 'react-router-dom';
import Products from './components/Products';

function App() {

  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const response = await commerce.products.list();
    setProducts((response && response.data) || []);
  };
  
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
    <Routes>
        <Route path="/" element={<Products products={products}/>} />
    </Routes>
    </>
  );
}

export default App;
