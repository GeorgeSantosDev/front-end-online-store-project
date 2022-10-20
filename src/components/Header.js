import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { getProductsFromCategoryAndQuery } from '../services/api';
import StoreContext from '../context/StoreContext';
import cart from '../images/Vector.png';
import logo from '../images/logo.png';

function Header() {
  const { setProductList, setProductNotFound } = useContext(StoreContext);
  const [searchedProduct, setSearchedProduct] = useState('');

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
      <label htmlFor="search">
        <input
          data-testid="query-input"
          type="text"
          id="search"
          placeholder="Pesquisa"
          value={ searchedProduct }
          onChange={ handleChange }
        />
      </label>

      <button
        data-testid="query-button"
        type="button"
        onClick={ handleClick }
      >
        Buscar
      </button>

      <img src={ logo } alt="front-end store logo " />

      <Link to="/shoppingcart" data-testid="shopping-cart-button">
        <img src={ cart } alt="cart icon" />
      </Link>
    </header>
  );
}

export default Header;
