import './App.css';
import { useState, useEffect } from 'react';
import { commerce } from './lib/commerce';
import {Route, Routes } from 'react-router-dom';
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Products from "./components/Products";
import Basket from "./components/Basket";
import Checkout from "./components/Checkout";
import { CssBaseline } from "@material-ui/core";
import ProductView from './components/ProductView';
import NotFound from './components/Error';

function App() {

  const [products, setProducts] = useState([]);
  const [basketData, setBasketData] = useState({});
  const [orderInfo, setOrderInfo] = useState({});
  const [orderError, setOrderError] = useState("");
  const [isCartUpdating, setIsCartUpdating] = useState(false);
  const [isCartAdded, setIsCartAdded] = useState(false);

  const fetchProducts = async () => {
    const response = await commerce.products.list();
    setProducts((response && response.data) || []);
  };

  const fetchBasketData = async () => {
    const response = await commerce.cart.retrieve();
    setBasketData(response);
  };

  const addProduct = async (productId, quantity) => {
      setIsCartAdded(true);
      const response = await commerce.cart.add(productId, quantity);
      setBasketData(response);
      setIsCartAdded(false);
  };

  const RemoveItemFromBasket = async (itemId) => {
    const response = await commerce.cart.remove(itemId);
    setBasketData(response);
  };

  const handleEmptyBasket = async () => {
    const response = await commerce.cart.empty();
    setBasketData(response);
  };

  const updateProduct = async (productId, quantity) => {
      setIsCartUpdating(true);
      const response = await commerce.cart.update(productId, { quantity });
      setBasketData(response);
      setIsCartUpdating(false);
  };

  const refreshBasket = async () => {
    const newBasketData = await commerce.cart.refresh();
    setBasketData(newBasketData);
  };

  const handleCheckout = async (checkoutId, orderData) => {
    try {
      if(checkoutId){
        await commerce.checkout.capture(
          checkoutId,
          orderData
        );
        setOrderInfo(orderData);
        await refreshBasket();
      }
    } catch (error) {
      setOrderError(
        (error.data && error.data.error && error.data.error.message) ||
          "There is an error occurred"
      );
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchBasketData();
  }, []);

  return (
    <div className='App'>
    <CssBaseline />
    <NavBar
          basketItems={basketData.total_items}
          totalCost={
            (basketData.subtotal &&
              basketData.subtotal.formatted_with_symbol) ||
            "00.00"
          }
          isCartAdded={isCartAdded}
        />
    <Routes>
        <Route path='*' element={<NotFound />} />
        <Route path="/" element={<Products products={products} addProduct={addProduct} />} />
        <Route path="/basket" element={ <Basket basketData={basketData} updateProduct={updateProduct}
              handleEmptyBasket={handleEmptyBasket}
              RemoveItemFromBasket={RemoveItemFromBasket}
              isCartUpdating={isCartUpdating}
            />}/>
        <Route path="/checkout" element = {<Checkout orderInfo={orderInfo} orderError={orderError}
              basketData={basketData}
              handleCheckout={handleCheckout}
            />}/>
        <Route path="/product-view/:id" element = {<ProductView addProduct={addProduct}/>} />
    </Routes>
    <Footer />
    </div>
  );
}

export default App;
