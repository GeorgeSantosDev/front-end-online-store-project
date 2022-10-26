import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { getLocalStorage } from '../services/storage';
import StoreContext from '../context/StoreContext';
import Header from '../components/Header';
import ItemCart from '../components/ItemCart';
import Total from '../components/Total';

function ShoppingCart() {
  const { cartItems, setCartItems } = useContext(StoreContext);

  const getProducts = () => {
    const productsAtCard = getLocalStorage('productsAtCart');
    setCartItems(!productsAtCard ? cartItems : productsAtCard);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <Header />

      <main>
        {
          cartItems[0] ? cartItems.map((product, i) => (
            <ItemCart product={ product } key={ `${i}-${product.id}` } />
          ))
            : <p data-testid="shopping-cart-empty-message"> Seu carrinho está vazio.</p>
        }

        <Total />

        <Link to="/checkout" data-testid="checkout-products">Finalizar compra</Link>
      </main>
    </div>
  );
}

export default ShoppingCart;
