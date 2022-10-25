import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import StoreContext from '../context/StoreContext';
import { setLocalStorage, getLocalStorage } from '../services/storage';

function ItemCart({ product }) {
  const { cartItems, setCartItems } = useContext(StoreContext);
  const [quantity, setQuantity] = useState(1);

  const handleIncreseClick = () => {
    setQuantity((prev) => prev + 1);

    const quantityItem = !getLocalStorage('quantity') ? [] : getLocalStorage('quantity');
    const newQuantity = [...quantityItem, { id: product.id, quantity: quantity + 1 }];

    setLocalStorage('quantity', newQuantity);
  };

  const handleDecreseClick = () => {
    setQuantity((prev) => {
      if (prev === 1) {
        return 1;
      }
      return prev - 1;
    });
  };

  const handleDelete = () => {
    const newCartItems = [...cartItems].filter((item) => item.id !== product.id);
    setCartItems(newCartItems);
    setLocalStorage('productsAtCart', newCartItems);
  };

  return (
    <div>
      <p data-testid="shopping-cart-product-name">{`Produto ${product.title}`}</p>

      <img src={ product.thumbnail } alt={ product.title } />

      <p>{`R$ ${product.price}`}</p>

      <div>
        <button
          type="button"
          data-testid="product-increase-quantity"
          onClick={ handleIncreseClick }
        >
          +
        </button>
        <p data-testid="shopping-cart-product-quantity">{ quantity }</p>
        <button
          type="button"
          data-testid="product-decrease-quantity"
          onClick={ handleDecreseClick }
        >
          -
        </button>
      </div>

      <button
        data-testid="remove-product"
        type="button"
        onClick={ handleDelete }
      >
        Excluir
      </button>

    </div>
  );
}

ItemCart.propTypes = {
  product: PropTypes.shape({
    price: PropTypes.number,
    thumbnail: PropTypes.string,
    title: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
};

export default ItemCart;
