import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { getLocalStorage } from '../services/storage';
import StoreContext from '../context/StoreContext';
import Header from '../components/Header';
import PaymentForm from '../components/PaymentForm';
import Total from '../components/Total';
import ReviewCard from '../components/ReviewCard';
import '../styles/Checkout.css';

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
    <div className="checkout-container">
      <Header />

      <main className="checkout-main-container">
        <Link to="/shoppingcart" className="back-link">Voltar</Link>

        <section className="container-flex">
          <div className="shopping-cart-products-container">
            <h2>Revise seus produtos</h2>
            <hr className="line" />
            {
              cartItems.map((product) => (
                <ReviewCard key={ product.id } product={ product } />
              ))
            }
            <Total />
          </div>

          <PaymentForm />
        </section>
      </main>
    </div>
  );
}

export default Checkout;
