import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import StoreContext from '../context/StoreContext';
import { setLocalStorage } from '../services/storage';
import '../styles/ProductCard.css';

function ProductCard({ product }) {
  const { cartItems, setCartItems } = useContext(StoreContext);

  const handleClick = () => {
    const newProductAtCart = [...cartItems, product];
    setLocalStorage('productsAtCart', newProductAtCart);
    setCartItems(newProductAtCart);
  };

  return (
    <div data-testid="product" className="product-container">
      <img src={ product.thumbnail } alt={ product.title } className="product-image" />

      <Link
        to={ `/productdetails/${product.id}` }
        data-testid="product-detail-link"
        className="product-name"
      >
        { product.title }
      </Link>

      <p className="product-price">{ `R$ ${product.price}` }</p>

      {
        product.shipping.free_shipping
          && <p data-testid="free-shipping" className="product-shipping">Frete grátis</p>
      }

      <button
        type="button"
        data-testid="product-add-to-cart"
        onClick={ handleClick }
        className="btn btn-primary add-btn"
      >
        Adicionar ao Carrinho
      </button>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    thumbnail: PropTypes.string,
    title: PropTypes.string,
    id: PropTypes.string,
    price: PropTypes.number,
    shipping: PropTypes.shape({
      free_shipping: PropTypes.bool,
    }),
  }).isRequired,
};

export default ProductCard;
