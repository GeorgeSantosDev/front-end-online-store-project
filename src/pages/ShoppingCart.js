import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { getLocalStorage } from '../services/storage';
import StoreContext from '../context/StoreContext';
import Header from '../components/Header';
import ItemCart from '../components/ItemCart';
import Total from '../components/Total';
import '../styles/ShoppingCart.css';

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
    <div className="shopping-cart-container">
      <Header />

      <main className="shopping-cart-container-main">
        <Link to="/" className="back-link">Voltar</Link>

        <section className="container-flex">
          <section className="shopping-cart-products-container">
            <h2>Carrinho de compras</h2>
            <hr className="line" />
            {
              cartItems[0] ? cartItems.map((product, i) => (
                <ItemCart product={ product } key={ `${i}-${product.id}` } />
              ))
                : (
                  <p data-testid="shopping-cart-empty-message" className="empty-phrase">
                    Seu carrinho está vazio
                  </p>
                )
            }
          </section>

          <section className="total-container">
            <Total />

            {
              cartItems[0] && (
                <Link
                  to="/checkout"
                  data-testid="checkout-products"
                  className="finalize-btn"
                >
                  Finalizar compra
                </Link>
              )
            }
          </section>
        </section>
      </main>
    </div>
  );
}

export default ShoppingCart;
