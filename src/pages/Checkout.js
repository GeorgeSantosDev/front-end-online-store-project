import React, { useEffect, useContext } from 'react';
import { getLocalStorage } from '../services/storage';
import StoreContext from '../context/StoreContext';
import Header from '../components/Header';
import PaymentForm from '../components/PaymentForm';
import Total from '../components/Total';

function Checkout() {
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
          cartItems.map((product) => (
            <div key={ product.id }>
              <img src={ product.thumbnail } alt={ product.title } />
              <p>{ product.title }</p>
            </div>
          ))
        }

        <Total />

        <PaymentForm />
      </main>
    </div>
  );
}

export default Checkout;
