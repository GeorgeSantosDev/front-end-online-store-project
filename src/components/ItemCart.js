import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import StoreContext from '../context/StoreContext';
import { setLocalStorage, getLocalStorage } from '../services/storage';
import '../styles/ItemCart.css';

function ItemCart({ product }) {
  const { cartItems, setCartItems, setWarningQuantityChange } = useContext(StoreContext);
  const [quantity, setQuantity] = useState(1);

  const checkAndReturn = (check, yes, not) => {
    const value = check ? yes : not;
    return value;
  };

  const quantityItem = getLocalStorage('quantity');

  const warningChange = () => setWarningQuantityChange((prev) => prev + 1);

  useEffect(() => {
    const checkQuantityItems = checkAndReturn(quantityItem, quantityItem, []);
    const qtd = checkQuantityItems.filter((item) => item.id === product.id);

    return qtd[0] && setQuantity(qtd[0].quantity);
  }, []);

  const addProductQuantity = () => {
    if (quantityItem && quantityItem.find((item) => item.id === product.id)) {
      const newQuantity = quantityItem.map((item2) => {
        const updateQuantity = item2.id === product.id
          ? { id: product.id, quantity: quantity + 1 } : item2;

        return updateQuantity;
      });

      return setLocalStorage('quantity', newQuantity);
    }
    const updateQuantity = quantityItem ? [...quantityItem,
      { id: product.id, quantity: quantity + 1 }]
      : [{ id: product.id, quantity: quantity + 1 }];

    setLocalStorage('quantity', updateQuantity);
  };

  const reduceProductQuantity = () => {
    const newQuantity = quantityItem.map((item) => {
      const updateQuantity = item.id === product.id
        ? { id: product.id, quantity: quantity - 1 } : item;

      return updateQuantity;
    });

    setLocalStorage('quantity', newQuantity);
  };

  const handleIncreseClick = () => {
    if (product.available_quantity === quantity) {
      return global.alert('Limite em estoque atingido');
    }

    setQuantity((prev) => prev + 1);
    addProductQuantity();
    warningChange();
  };

  const handleDecreseClick = () => {
    setQuantity((prev) => {
      if (prev === 1) {
        return 1;
      }
      reduceProductQuantity();
      return prev - 1;
    });
    warningChange();
  };

  const handleDelete = () => {
    const newCartItems = [...cartItems].filter((item) => item.id !== product.id);
    const updateQuantity = quantityItem && quantityItem
      .filter((item) => item.id !== product.id);

    setCartItems(newCartItems);
    setLocalStorage('productsAtCart', newCartItems);
    setLocalStorage('quantity', updateQuantity);
  };

  return (
    <div className="shoppin-cart-card">
      <div className="shoppin-cart-item">
        <button
          data-testid="remove-product"
          type="button"
          onClick={ handleDelete }
          className="btn btn-danger delete-btn"
        >
          X
        </button>

        <img src={ product.thumbnail } alt={ product.title } className="item-image" />

        <p data-testid="shopping-cart-product-name" className="item-name">
          {`Produto ${product.title}`}
        </p>

        <div className="update-quantity-container">
          <button
            type="button"
            data-testid="product-increase-quantity"
            className="btn btn-dark"
            onClick={ handleIncreseClick }
          >
            +
          </button>
          <p data-testid="shopping-cart-product-quantity">{ quantity }</p>
          <button
            type="button"
            data-testid="product-decrease-quantity"
            className="btn btn-dark"
            onClick={ handleDecreseClick }
          >
            -
          </button>
        </div>

        <p className="item-price">{`R$ ${product.price}`}</p>
      </div>
      <hr className="line" />
    </div>
  );
}

ItemCart.propTypes = {
  product: PropTypes.shape({
    price: PropTypes.number,
    thumbnail: PropTypes.string,
    title: PropTypes.string,
    id: PropTypes.string,
    available_quantity: PropTypes.number,
  }).isRequired,
};

export default ItemCart;
