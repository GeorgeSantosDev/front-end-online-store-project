import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProductsFromCategoryAndQuery } from '../services/api';
import { getLocalStorage } from '../services/storage';
import StoreContext from '../context/StoreContext';
import cart from '../images/Vector.png';
import logo from '../images/logo.png';
import '../styles/Header.css';

function Header() {
  const { setProductList,
    setProductNotFound,
    cartItems,
    warningQuatityChange } = useContext(StoreContext);

  const [searchedProduct, setSearchedProduct] = useState('');
  const [quantityOfProducts, setQuantityOfProducts] = useState(0);

  const getProductsAtCart = () => getLocalStorage('productsAtCart');
  const getQuantityOfProducts = () => getLocalStorage('quantity');

  useEffect(() => {
    if (getProductsAtCart() && getQuantityOfProducts()) {
      const quantity = getProductsAtCart().reduce((acc, product) => {
        const qtdProduct = getQuantityOfProducts().find((item) => item.id === product.id);
        const multiplier = qtdProduct ? qtdProduct.quantity : 1;

        return acc + multiplier;
      }, 0);
      setQuantityOfProducts(quantity);
    } else if (getProductsAtCart()) {
      const items = getProductsAtCart().length;
      setQuantityOfProducts(items);
    } else {
      setQuantityOfProducts(0);
    }
  }, [cartItems, warningQuatityChange]);

  const handleChange = ({ target: { value } }) => {
    setSearchedProduct(value);
  };

  const handleClick = async () => {
    const products = await getProductsFromCategoryAndQuery(null, searchedProduct);
    if (searchedProduct.trim() !== '' && products) {
      setProductList(products.results);
      setProductNotFound(false);
    } else {
      setProductNotFound(true);
    }
  };

  return (
    <header>
      <div className="header-elements-container">
        <label htmlFor="search">
          <input
            data-testid="query-input"
            type="text"
            id="search"
            className="search-input form-control"
            placeholder="Pesquisa"
            value={ searchedProduct }
            onChange={ handleChange }
          />
        </label>

        <button
          data-testid="query-button"
          type="button"
          className="btn btn-success"
          onClick={ handleClick }
        >
          Buscar
        </button>
      </div>

      <img src={ logo } alt="front-end store logo " className="logo" />

      <div className="header-elements-container">
        <Link to="/shoppingcart" data-testid="shopping-cart-button">
          <img src={ cart } alt="cart icon" />
        </Link>

        <sub>{ quantityOfProducts }</sub>
      </div>
    </header>
  );
}

export default Header;
