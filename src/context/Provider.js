import React, { useState } from 'react';
import PropTypes from 'prop-types';
import StoreContext from './StoreContext';

function Provider({ children }) {
  const [productList, setProductList] = useState([]);
  const [productNotFound, setProductNotFound] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [productEvaluations, setProductEvaluations] = useState([]);
  const [warningQuatityChange, setWarningQuantityChange] = useState(0);

  const contextValues = {
    productList,
    setProductList,
    productNotFound,
    setProductNotFound,
    cartItems,
    setCartItems,
    productEvaluations,
    setProductEvaluations,
    warningQuatityChange,
    setWarningQuantityChange,
  };

  return (
    <StoreContext.Provider value={ contextValues }>
      { children }
    </StoreContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
